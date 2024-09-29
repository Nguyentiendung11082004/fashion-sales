export interface IUser {
  id: number;
  name: string;
  avatar: string;
  phone_number: string;
  email: string;
  address: string;
  password: string;
  birth_date: Date;
  is_active: boolean;
  gender: boolean;
  create_at: Date;
  role_id: number;
}
