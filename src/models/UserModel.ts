import { required, compare, prop,  maxLength,email} from "@rxweb/reactive-forms";
export class User {

    
    @required()
    firstName: string | undefined

    @required()
    lastName!: string;

    @maxLength({ value: 10 ,message:'max reached'})
    idNumber!: string;

    @maxLength({ value: 10 ,message:'max reached'})
    phoneNumber!: string;

    @email({message:'Invalid email'})
    email!: string;

    @prop()
    password!: string;

    @compare({ fieldName: 'password', message: 'You must enter same password' })
    confirmPassword!: string;
}

export class UserLogin{
    @email({message:'Invalid email'})
    email!: string;

    @required()
    password!: string;
}