import {prisma} from './src/lib/prisma'

async function main() {
    const newProduct = await prisma.product.create({
                data:{
                    name: 'tele',
                    price: 99.99,
                    stock: 100,
                    imageUrl: 'una-url',
                    categoryId: 1
                }
            })
    console.log(newProduct);
    
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });