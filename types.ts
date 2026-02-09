export interface Coordinator {
  name: string;
  phone: string;
  role: string;
  image: string;
}

export interface Prize {
  rank: string;
  amount: string;
  icon: string;
  color: string;
}

export interface RuleCategory {
  title: string;
  rules: string[];
}

export interface RegistrationData {
  teamName: string;
  leaderName: string;
  collegeName: string;
  cityState: string;
  email: string;
  phone: string;
  department: string;
  robotSpecs: string;
  paymentScreenshot: File | null;
  agreedToRules: boolean;
}