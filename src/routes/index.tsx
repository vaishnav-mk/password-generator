import { Component, createSignal, createEffect, For } from "solid-js";
import { A } from "solid-start";
import { passwordStrength } from "~/utils/password-strength";
import { generatePassword } from "~/utils/generate-password";
import toast, { Toaster } from "solid-toast";

function classnames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

type PasswordStrengthProps = {
  score: number;
};

const PasswordStrength: Component<PasswordStrengthProps> = (props: any) => {
  console.log({ props, s: props.strength });
  const strengthText = {
    0: "",
    1: "Too Weak!",
    2: "Weak",
    3: "Medium",
    4: "Strong",
  };
  function shouldUpdate(props: any) {
    return this.props.strength !== props.strength;
  }

  return (
    <div class="mt-8 flex h-14 flex-wrap items-center justify-between bg-gray-900 px-4 md:h-[72px] md:px-8">
      <span class="mr-2 uppercase text-gray-500">Strength</span>

      <div class="flex items-center gap-4">
        <span class="text-body-medium uppercase md:text-heading-medium">
          {strengthText[props.strength]}
        </span>

        <div class="flex items-center gap-2">
          <For each={Array.from({ length: 4 })}>
            {(_, idx) => (
              <div
                class={classnames(
                  "h-[28px] w-[10px] border-2 border-gray-200 bg-transparent",
                  idx() < props.strength &&
                    props.strength === 1 &&
                    "border-red-500 bg-red-500",
                  idx() < props.strength &&
                    props.strength === 2 &&
                    "border-orange-500 bg-orange-500",
                  idx() < props.strength &&
                    props.strength === 3 &&
                    "border-yellow-500 bg-yellow-500",
                  idx() < props.strength &&
                    props.strength === 4 &&
                    "border-green-500 bg-green-500"
                )}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

const PasswordGenerator: Component = () => {
  const [length, setLength] = createSignal(10);
  const [generatedPassword, setGeneratedPassword] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");
  const [passwordCopied, setPasswordCopied] = createSignal(false);
  const [hasUppercase, setHasUppercase] = createSignal(false);
  const [hasLowercase, setHasLowercase] = createSignal(false);
  const [hasNumbers, setHasNumbers] = createSignal(false);
  const [hasSymbols, setHasSymbols] = createSignal(false);
  const [passStrength, setPassStrength] = createSignal();

  createEffect(() => {
    let { score, strength } = passwordStrength(generatedPassword());
    console.log({ score, strength });
    setPassStrength(strength);
  }, [generatedPassword]);

  const copyGeneratedPassword = async () => {
    try {
      if (!generatedPassword().length)
        return toast("No password generated!", {
          className: "mr-4 mt-[6px] font-bold uppercase text-red-500",
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "text-red-500",
          },
        });
      toast("Password copied to clipboard!", {
        className: "mr-4 mt-[6px] font-bold uppercase text-green-500",
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "text-green-500",
        },
      });
      await navigator.clipboard.writeText(generatedPassword());
      setPasswordCopied(true);

      setTimeout(() => {
        setPasswordCopied(false);
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleGeneratePassword = async (event: Event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!length()) {
      setErrorMessage("Please enter a password length");
      return;
    }

    if (!hasUppercase() && !hasLowercase() && !hasNumbers() && !hasSymbols()) {
      setErrorMessage("Please select at least one option");
      return;
    }

    const generatedPassword = generatePassword({
      length: length(),
      hasUppercase: hasUppercase(),
      hasLowercase: hasLowercase(),
      hasNumbers: hasNumbers(),
      hasSymbols: hasSymbols(),
    });
    //loop through an array of fake passwords, set that password for 500ms and then set the generated password
    for (const fakePassword of generatedPassword.split("")) {
      let fakePassword = generatePassword({
        length: length(),
        hasUppercase: hasUppercase(),
        hasLowercase: hasLowercase(),
        hasNumbers: hasNumbers(),
        hasSymbols: hasSymbols(),
      });
      setGeneratedPassword(fakePassword);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setGeneratedPassword(generatedPassword);
    toast("Password generated!", {
      className: "mr-4 mt-[6px] font-bold uppercase text-green-500",
      style: {
        background: "rgba(0, 0, 0, 0.8)",
        color: "text-green-500",
      },
    });
  };

  return (
    <main class="flex flex-col items-center justify-center py-16 px-4 md:mx-auto md:max-w-[540px] md:px-0 md:pt-[133px] text-white font-bold text-lg">
      <h1 class="mb-4 text-gray-500 md:mb-8 md:text-heading-medium">
        Password Generator
      </h1>

      <div class="mb-4 flex w-full items-center justify-between bg-gray-800 p-4 md:mb-6 md:py-[19px] md:px-8">
        <strong
          class={classnames(
            "text-heading-medium text-gray-200 md:text-heading-large",
            !generatedPassword().length && "text-opacity-25"
          )}
        >
          {generatedPassword().length ? generatedPassword() : "P4$5W0rD!"}
        </strong>

        <div class="flex items-center">
          <button
            aria-label="Copy Password"
            onClick={copyGeneratedPassword}
            class="group h-5 w-[17.5px] md:h-6 md:w-[21px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 24">
              <path
                class="fill-green-500 transition-colors group-hover:fill-white"
                d="M20.341 3.091L17.909.659A2.25 2.25 0 0016.319 0H8.25A2.25 2.25 0 006 2.25V4.5H2.25A2.25 2.25 0 000 6.75v15A2.25 2.25 0 002.25 24h10.5A2.25 2.25 0 0015 21.75V19.5h3.75A2.25 2.25 0 0021 17.25V4.682a2.25 2.25 0 00-.659-1.591zM12.469 21.75H2.53a.281.281 0 01-.281-.281V7.03a.281.281 0 01.281-.281H6v10.5a2.25 2.25 0 002.25 2.25h4.5v1.969a.282.282 0 01-.281.281zm6-4.5H8.53a.281.281 0 01-.281-.281V2.53a.281.281 0 01.281-.281h4.97v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 01-.281.281zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 01.082.199v.451z"
              />
            </svg>
          </button>
        </div>
      </div>

      <form
        onSubmit={handleGeneratePassword}
        class="w-full bg-gray-800 p-4 md:px-8 md:pt-6 md:pb-8"
      >
        <div class="mb-8">
          <label
            for="characters-length"
            class="mb-2 flex items-center justify-between md:mb-4"
          >
            Character Length
            <span class="text-heading-medium text-green-500 md:text-heading-large">
              {length()}
            </span>
          </label>
          <input
            id="characters-length"
            type="range"
            min="0"
            max="20"
            value={length()}
            step="1"
            class="h-2 w-full appearance-none bg-gray-900 bg-gradient-to-r from-green-500 to-green-500 bg-no-repeat"
            style={{ "background-size": `${(length() * 100) / 20}% 100%` }}
            onInput={(e) => setLength(parseInt(e.currentTarget.value))}
          />
        </div>

        <ul class="flex flex-col gap-5">
          <li>
            <div class="flex items-center">
              <input
                checked={hasUppercase()}
                id="uppercase"
                type="checkbox"
                onChange={(e) => setHasUppercase(e.currentTarget.checked)}
                class="h-5 w-5 cursor-pointer border-2 border-gray-200 bg-transparent text-green-500 checked:bg-icon-check checked:bg-[length:12px] hover:border-green-500 focus:border-green-500 focus:ring-0 focus:ring-offset-0"
              />
              <label
                for="uppercase"
                class="ml-5 cursor-pointer font-bold md:ml-6"
              >
                Include Uppercase Letters
              </label>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <input
                checked={hasLowercase()}
                id="lowercase"
                type="checkbox"
                onChange={(e) => setHasLowercase(e.currentTarget.checked)}
                class="h-5 w-5 cursor-pointer border-2 border-gray-200 bg-transparent text-green-500 checked:bg-icon-check checked:bg-[length:12px] hover:border-green-500 focus:border-green-500 focus:ring-0 focus:ring-offset-0"
              />
              <label
                for="lowercase"
                class="ml-5 cursor-pointer font-bold md:ml-6"
              >
                Include Lowercase Letters
              </label>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <input
                checked={hasNumbers()}
                id="numbers"
                type="checkbox"
                onChange={(e) => setHasNumbers(e.currentTarget.checked)}
                class="h-5 w-5 cursor-pointer border-2 border-gray-200 bg-transparent text-green-500 checked:bg-icon-check checked:bg-[length:12px] hover:border-green-500 focus:border-green-500 focus:ring-0 focus:ring-offset-0"
              />
              <label
                for="numbers"
                class="ml-5 cursor-pointer font-bold md:ml-6"
              >
                Include Numbers
              </label>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <input
                checked={hasSymbols()}
                id="symbols"
                type="checkbox"
                onChange={(e) => setHasSymbols(e.currentTarget.checked)}
                class="h-5 w-5 cursor-pointer border-2 border-gray-200 bg-transparent text-green-500 checked:bg-icon-check checked:bg-[length:12px] hover:border-green-500 focus:border-green-500 focus:ring-0 focus:ring-offset-0"
              />
              <label
                for="symbols"
                class="ml-5 cursor-pointer font-bold md:ml-6"
              >
                Include Symbols
              </label>
            </div>
          </li>
        </ul>

        <PasswordStrength strength={passStrength()} />

        <button
          type="submit"
          class="group mt-4 flex h-14 w-full items-center justify-center bg-green-500 transition-all hover:bg-transparent hover:border-2 hover:border-green-500 md:mt-8 md:h-16"
        >
          <span class="mr-4 uppercase text-gray-800 group-hover:text-green-500 md:mr-6">
            Generate
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
            <path
              class="fill-gray-800 group-hover:fill-green-500"
              d="M5.106 12l6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </button>

        {errorMessage() && (
          <span class="mt-4 block text-sm text-red-500">{errorMessage()}</span>
        )}
      </form>
      <Toaster position="top-center" />
    </main>
  );
};
export default PasswordGenerator;
