export interface RegistrationButtonProps {
    competitionId: string;
    userId: string[];
    nisn: string[];
}

export interface TabButtonProps {
    buttonName: string;
    isActive?: boolean;
    onClick: () => void;
}