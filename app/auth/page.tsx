import { AuthCard } from "@/components/auth-card";

type Params = Record<string, string | string[] | undefined>;

function pickMessage(value: string | string[] | undefined) {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
}

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const errorMessage = pickMessage(params.error);
  const successMessage = pickMessage(params.success);

  return (
    <section className="center-page">
      <AuthCard errorMessage={errorMessage} successMessage={successMessage} />
    </section>
  );
}
