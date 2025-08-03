import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{ user?: User }>();
    const user = request.user;
    if (!user) {
      return null;
    }
    return data ? user[data] : user;
  },
);
