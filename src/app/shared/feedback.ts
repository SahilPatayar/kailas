export const ContactType = ['None', 'Tel', 'Email'];

export class Feedback {
    firstName: string;
    lastName: string;
    telNum: number;
    email: string;
    agree: boolean;
    contactType: string;
    message: string;
}
