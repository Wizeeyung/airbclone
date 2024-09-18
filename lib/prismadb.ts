import {PrismaClient} from '@prisma/client';

//declared  priasma globally so it can be used in different parts of the code
declare global{
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma= client;

export default client;