import { APIEvent, json } from "solid-start/api";
import { passwordStrength } from "~/utils/password-strength";

export async function GET({ params }: APIEvent) {
    return json({ password: params.password, strength: passwordStrength(params.password) });
}