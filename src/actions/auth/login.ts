'use server';
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'success';

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Las credenciales no son correctas.';
        default:
          return 'Ha ocurrido un error.';
      }
    }
    throw error;
  }
}


export const login = async (email: string, password: string) => {
    try {
      await  signIn('credentials', {email,password})

      return {
        ok: true,
        message: 'Usuario logueado correctamente',
      }
    } catch (error) {
      return {
        ok: false,
        message: 'No se pudo loguear el usuario',
      }
      
    }
}