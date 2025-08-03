import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    if (!cpf || typeof cpf !== 'string') return false;

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i);
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== +cpf[9]) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i);
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    return secondCheck === +cpf[10];
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCPFConstraint,
    });
  };
}
