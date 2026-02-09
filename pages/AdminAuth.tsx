import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import {
    doc,
    updateDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';
import { LogIn, UserPlus, ShieldCheck, Mail, Lock, User, Key, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

const AdminAuth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [configError, setConfigError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSecretCode, setShowSecretCode] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        secretCode: ''
    });

    // Diagnostic Check
    useEffect(() => {
        if (!auth.app.options.apiKey) {
            console.error("Firebase API Key is missing! Check your .env.local file.");
            setConfigError(true);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const email = formData.email.trim();
            const password = formData.password;
            const secretCode = formData.secretCode.trim().toUpperCase();

            if (isLogin) {
                // Login Logic
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/admin/dashboard');
            } else {
                // Signup Logic
                if (!secretCode) throw new Error('Secret code is required.');

                console.log("Verifying secret code:", secretCode);

                const codeQuery = query(
                    collection(db, 'secret_codes'),
                    where('code', '==', secretCode),
                    where('used', '==', false)
                );

                let codeSnap;
                try {
                    codeSnap = await getDocs(codeQuery);
                } catch (dbErr: any) {
                    console.error("Firestore Error:", dbErr);
                    throw new Error('Database connection failed. Please check your internet or Firebase permissions.');
                }

                if (codeSnap.empty) {
                    // Try to fetch all unused codes for deep debugging
                    const debugSnap = await getDocs(query(collection(db, 'secret_codes'), where('used', '==', false)));
                    const unusedCodes = debugSnap.docs.map(d => ({ id: d.id, data: d.data() }));

                    console.log("Deep Diagnostic - Unused codes found:", unusedCodes);

                    // Check for common typos or hidden spaces in the field names
                    const foundMatch = unusedCodes.find(doc => {
                        const data = doc.data;
                        // Search for any key that looks like 'code' (handles 'code ', 'Code', etc.)
                        const codeKey = Object.keys(data).find(k => k.trim().toLowerCase() === 'code');
                        if (codeKey) {
                            const dbValue = String(data[codeKey]).trim().toUpperCase();
                            return dbValue === secretCode;
                        }
                        return false;
                    });

                    if (foundMatch) {
                        console.warn("Found a match via fallback! It looks like your Firestore field name might have a space or typo.");
                        // Proceed with this match if we found it through fallback
                        const codeDoc = debugSnap.docs.find(d => d.id === foundMatch.id)!;

                        // Continue registration with the found doc...
                        await createAdminUser(email, password, formData.name.trim(), codeDoc);
                        return;
                    }

                    throw new Error('Invalid secret code. Please ensure it matches exactly what you see in Firestore.');
                }

                await createAdminUser(email, password, formData.name.trim(), codeSnap.docs[0]);
            }
        } catch (err: any) {
            console.error("Auth Exception:", err);

            let userMessage = err.message;
            if (err.code === 'auth/configuration-not-found') {
                userMessage = "Email/Password sign-in is not enabled in Firebase Console. Please enable it in Authentication > Sign-in method.";
            } else if (err.code === 'auth/invalid-email') {
                userMessage = "Invalid email address format.";
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                userMessage = "Invalid email or password.";
            } else if (err.code === 'auth/email-already-in-use') {
                userMessage = "This email is already registered. Please login instead.";
            } else if (err.code === 'auth/weak-password') {
                userMessage = "Password should be at least 6 characters.";
            }

            setError(userMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to keep handleSubmit clean
    const createAdminUser = async (email: string, password: string, name: string, codeDoc: any) => {
        console.log("Creating auth user...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        console.log("Updating profile...");
        await updateProfile(userCredential.user, { displayName: name });

        console.log("Saving admin data...");
        await setDoc(doc(db, 'admins', userCredential.user.uid), {
            name: name,
            email: email,
            role: 'organiser',
            createdAt: new Date().toISOString()
        });

        console.log("Marking code as used...");
        await updateDoc(doc(db, 'secret_codes', codeDoc.id), {
            used: true,
            usedBy: email,
            usedAt: new Date().toISOString()
        });

        navigate('/admin/dashboard');
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#0d0d0d] overflow-hidden font-poppins px-6 relative">
            {/* Back to Home Button */}
            <Link
                to="/"
                className="absolute top-8 left-8 flex items-center space-x-2 text-[#8e8e8e] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-[#212121]"
            >
                <ArrowLeft size={16} />
                <span className="text-xs font-semibold uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="w-full max-w-[360px]">
                <div className="flex flex-col items-center">
                    {/* Centered Logo */}
                    <div className="mb-10 text-center">
                        <div className="mb-6 flex justify-center">
                            <span className="font-extrabold text-2xl tracking-tighter text-white">
                                ROBORACE <span className="text-[#10a37f]">26</span>
                            </span>
                        </div>
                        <h1 className="text-3xl font-semibold text-white tracking-tight">
                            {isLogin ? 'Welcome back' : 'Create account'}
                        </h1>
                    </div>

                    {configError && (
                        <div className="w-full mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-xs flex items-start gap-3">
                            <AlertCircle size={18} className="shrink-0" />
                            <p><strong>Config Error:</strong> Firebase credentials are not loading from `.env.local`. Check your spelling and restart your dev server.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        {!isLogin && (
                            <div className="space-y-1">
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    className="w-full bg-[#212121] border border-[#303030] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-[#8e8e8e]"
                                />
                            </div>
                        )}

                        <div className="space-y-1">
                            <input
                                required
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email address"
                                className="w-full bg-[#212121] border border-[#303030] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-[#8e8e8e]"
                            />
                        </div>

                        <div className="space-y-1 relative">
                            <input
                                required
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="w-full bg-[#212121] border border-[#303030] rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-[#8e8e8e]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e8e8e] hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {!isLogin && (
                            <div className="space-y-1 relative">
                                <input
                                    required
                                    name="secretCode"
                                    type={showSecretCode ? "text" : "password"}
                                    value={formData.secretCode}
                                    onChange={handleInputChange}
                                    placeholder="Secret Access Code"
                                    className="w-full bg-[#212121] border border-[#10a37f]/30 rounded-lg px-4 py-3 pr-12 text-[#10a37f] focus:outline-none focus:ring-1 focus:ring-[#10a37f] transition-all placeholder:text-[#10a37f]/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSecretCode(!showSecretCode)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#10a37f]/50 hover:text-[#10a37f] transition-colors"
                                >
                                    {showSecretCode ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-[#ef4444] text-xs font-medium text-center leading-relaxed">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || configError}
                            className="w-full py-3 bg-[#10a37f] text-white rounded-lg font-semibold text-base hover:bg-[#1a7f64] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                            ) : (
                                <span>Continue</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setShowPassword(false);
                                    setShowSecretCode(false);
                                    setError('');
                                }}
                                className="text-[#10a37f] hover:underline font-medium"
                            >
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* ChatGPT Style Footer Line */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center px-6">
                <div className="flex space-x-4 text-[#8e8e8e] text-[12px]">
                    <span className="hover:text-white cursor-pointer">Terms of use</span>
                    <span className="text-[#303030]">|</span>
                    <span className="hover:text-white cursor-pointer">Privacy policy</span>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
