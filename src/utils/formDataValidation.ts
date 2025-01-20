import { z } from "zod";
import parsePhoneNumberFromString from 'libphonenumber-js';

export const zPhone = z.string({ message: "No dejes vacío este campo." }).transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    // set this to use a default country when the phone number omits country code
    defaultCountry: 'MX',
    
    // set to false to require that the whole string is exactly a phone number,
    // otherwise, it will search for a phone number anywhere within the string
    extract: false,
  });

  // when it's good
  if (phone && phone.isValid()) {
    return phone.number;
  }

  // when it's not
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: 'Usa un número telefónico válido.',
  });
  return z.NEVER;
});

export const formSchema = z.object({
    nombre: z.string({ message: "No dejes vacío este campo." })
        .min(2, "Tu nombre debe de tener al menos 2 letras.")
        .max(20, "Tu nombre no puede tener más de 20 letras."),

    apellidos: z.string({ message: "No dejes vacío este campo." })
    .min(4, "Tus apellidos deben de tener al menos 4 letras.")
    .max(40, "Tus apellidos no pueden tener más de 40 letras."),

    edad: z.number({ message: "Tu edad debe de ser un número.", coerce: true })
        .int("Tu edad debe de ser un número entero.")
        .positive("Tu edad debe de ser positiva.")
        .max(99, "¿Seguro que tienes más de 99 años?"),

    correo_electronico: z.string({ message: "No dejes vacío este campo." }).email("Usa un correo electrónico válido."),

    numero_telefonico: zPhone,

    grupo: z.string({ message: "No dejes vacío este campo."}),
    grupo_alternativo: z.string({ message: "No dejes vacío este campo."}).optional(),
    
    semestre: z.string().optional(),

    residencia: z.string({ message: "No dejes vacío este campo."}),
    residencia_alternativa: z.string({ message: "No dejes vacío este campo."}).optional(),

    involucramiento: z.enum([
        "Estudio de Biblia",
        "Misionero",
        "No estoy involucrado"
    ], { message: "No dejes vacío este campo." }),
    involucramiento_alternativo: z.string().optional(),

    referencia: z.string().optional()
}).superRefine((data, ctx) => {
    let errorsArose = false;

    if (data.grupo === "OTRO" && (data.grupo_alternativo ?? '').replace(/\s/, '').length === 0 ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["grupo_alternativo"],
            fatal: true,
            message: "No dejes vacío este campo."
        })
        
        errorsArose = true;
    } else if (data.grupo && data.grupo !== "OTRO") {
        delete data.grupo_alternativo;
    }
    
    if (data.residencia === "No" && (data.residencia_alternativa ?? '').replace(/\s/, '').length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["residencia_alternativa"],
            fatal: true,
            message: "No dejes vacío este campo."
        })

        return errorsArose = true;
    } else if (data.residencia && data.residencia !== "No") {
        delete data.residencia_alternativa;
    }

    if (data.involucramiento === "No estoy involucrado" && (data.involucramiento_alternativo ?? '').replace(/\s/, '').length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["involucramiento_alternativo"],
            fatal: true,
            message: "No dejes vacío este campo."
        })

        return errorsArose = true;
    } else if (data.involucramiento && data.involucramiento !== "No estoy involucrado") {
        delete data.involucramiento_alternativo;
    }
    
    return !errorsArose
    
})
