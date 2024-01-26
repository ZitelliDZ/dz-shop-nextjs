import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    //redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" />

      <div className="flex flex-col gap-3 ml-20 " >
        <span>Nombre: {session.user.name}</span>
        <span>Email: {session.user.email}</span>
        <span>Rol: {session.user.role === 'user' ? 'Usuario':'Administrador'}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
