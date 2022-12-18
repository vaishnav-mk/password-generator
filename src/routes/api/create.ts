import { APIEvent, json } from "solid-start/api";
import { Options } from "~/types";
import { generatePassword } from "~/utils/generate-password";
import { passwordStrength } from "~/utils/password-strength";
import { getJSONRequest } from "~/utils/apiUtils";
export async function POST({ request }: APIEvent) {
  try {
    const body = await getJSONRequest(request.body);
    if (!body) return json({ message: "No body provided" }, { status: 400 });
    const { length, hasNumbers, hasSymbols, hasUppercase, hasLowercase } =
      body as Options;

    if (!length)
      return json({ message: "Length is required" }, { status: 400 });

    if (!hasNumbers && !hasSymbols && !hasUppercase && !hasLowercase) {
      return json(
        {
          message:
            "At least one of the options is required (false): [hasNumbers, hasSymbols, hasUppercase, hasLowercase]",
        },
        { status: 400 }
      );
    }

    const password = generatePassword({
      length,
      hasNumbers,
      hasSymbols,
      hasUppercase,
      hasLowercase,
    });

    return json({ password, strength: passwordStrength(password) });
  } catch (error) {
    return json(
      { message: "An unknown error has occured, please try again!" },
      { status: 403 }
    );
  }
}
