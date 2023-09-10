import { Prisma } from "@prisma/client";

export type ExtendedCodeGenerator = Prisma.CodeGeneratorGetPayload<{
  include: {
    messages: true;
  };
}>;

export type ExtendedCodeGeneratorMessage = Prisma.CodeGeneratorMessageGetPayload<{
  include: {
    user: true;
  };
}>;

export type ExtendedGeneration = Prisma.GenerationGetPayload<{
  include: {
    codeGenerator: {
      include: {
        messages: true;
      };
    };
  };
}>;

export type ExtendedTutor = Prisma.TutorGetPayload<{
  include: {
    messages: true;
  };
}>;

export type ExtendedUser = Prisma.UserGetPayload<{
  include: {
    accounts: true;
    sessions: true;
    generations: true;
    tutors: {
      include: {
        messages: true;
      };
    };
    messages: true;
    codeGenerators: {
      include: {
        messages: true;
      };
    };
  };
}>;
