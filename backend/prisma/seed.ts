import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const tags = [
        "Studies",
        "Home",
        "Online",
        "Work",
        "Test",
        "Exam",
        "Other"
    ]

    for (const tag of tags) {
        await prisma.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag }
        })
    }

    console.log("✅ Default tags have been added.")
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
