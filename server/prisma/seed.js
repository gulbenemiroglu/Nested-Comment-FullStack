import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  const user1 = await prisma.user.create({ data: { name: "User 1" } })
  const user2 = await prisma.user.create({ data: { name: "User 2" } })

  const post1 = await prisma.post.create({
    data: {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum.",
      title: "Post 1",
    },
  })
  // const post2 = await prisma.post.create({
  //   data: {
  //     body: "Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.",
  //     title: "Post 2",
  //   },
  // })

  const comment1 = await prisma.comment.create({
    data: {
      message: "First comment from User 1",
      userId: user1.id,
      postId: post1.id,
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "Nested Comment 1 from User 2",
      userId: user2.id,
      postId: post1.id,
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      message: "First Comment from User 2",
      userId: user2.id,
      postId: post1.id,
    },
  })
}

seed()