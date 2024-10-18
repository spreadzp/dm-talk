'use server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOrCreateUser(userData: { senderAddress: string; avatar: string; userName: string }) {
    const { senderAddress } = userData;

    // Check if a user with the same senderAddress already exists
    let user = await prisma.user.findFirst({
        where: { senderAddress: senderAddress },
    });

    // If the user does not exist, create a new user
    if (!user) {
        user = await createUser(userData);
    }

    return user;
}
export async function createUser(userData: { senderAddress: string; avatar: string; userName: string }) {
    const { senderAddress, avatar, userName } = userData;

    // Check if a user with the same senderAddress already exists
    const existingUser = await prisma.user.findFirst({
        where: { senderAddress: senderAddress },
    });

    if (existingUser) {
        throw new Error(`User with senderAddress ${senderAddress} already exists`);
    }

    // Create the new user
    const newUser = await prisma.user.create({
        data: {
            senderAddress: senderAddress,
            avatar: avatar,
            userName: userName,
        },
    });

    return newUser;
}

export async function createUserChat(userAddress: string, chainId: string, chatIds: string[]) {
    const user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
    });

    if (!user) {
        throw new Error(`User with address ${userAddress} not found`);
    }

    const userChats = await prisma.userChats.create({
        data: {
            user: { connect: { id: user.id } },
            chains: {
                create: {
                    chainId: chainId,
                    name: `Chain ${chainId}`, // Replace with actual name
                    avatar: "defaultAvatar", // Replace with actual avatar
                },
            },
        },
    });

    for (const chatId of chatIds) {
        await prisma.chat.create({
            data: {
                chatId: chatId,
                userChats: { connect: { id: userChats.id } },
            },
        });
    }

    return userChats;
}

export async function getUserChatsByUserAddress(userAddress: string) {
    const chats = await prisma.chat.findMany({
        where: {
            OR: [
                { chatId: { startsWith: `${userAddress}_` } },
                { chatId: { endsWith: `_${userAddress}` } },
            ],
        },
        include: {
            userChats: {
                include: {
                    chains: true,
                    chats: {
                        include: {
                            messages: true,
                        },
                    },
                },
            },
        }
    });

    // Transform the data into the desired format
    const transformedChats = chats.map(chat => {
        const chain = chat.userChats.chains[0]; // Assuming there's always at least one chain
        const messages = chat.userChats.chats[0].messages; // Assuming there's always at least one chat

        return {
            chatId: chat.chatId,
            chainId: chain.chainId,
            avatar: chain.avatar,
            messages: messages.length,
        };
    });


    return transformedChats;
}



export async function deleteUserChatsByUserAddress(userAddress: string) {
    const user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
        include: {
            userChats: true,
        },
    });

    if (!user) {
        throw new Error(`User with address ${userAddress} not found`);
    }

    const userChats = user.userChats[0];

    if (!userChats) {
        throw new Error(`UserChats for user with address ${userAddress} not found`);
    }

    await prisma.userChats.delete({
        where: { id: userChats.id },
    });

    return userChats;
}

export async function createChat(chatId: string, userChatsId: string, chatData: any) {
    return await prisma.chat.create({
        data: {
            chatId: chatId,
            userChats: { connect: { id: userChatsId } },
            messages: {
                create: {
                    date: chatData.date,
                    message: chatData.message,
                    typeMessage: chatData.typeMessage,
                    user: { connect: { id: chatData.userId } },
                },
            },
        },
    });
}

export async function getChatByChatId(chatId: string) {
    return await prisma.chat.findFirst({
        where: { chatId: chatId },
        include: {
            messages: {
                include: {
                    user: true,
                },
            },
        },
    });

}

export async function updateChatByChatId(chatId: string, newMessageData: any) {
    const chat = await prisma.chat.findFirst({
        where: { chatId: chatId },
    });

    if (!chat) {
        throw new Error(`Chat with chatId ${chatId} not found`);
    }

    return await prisma.chat.update({
        where: { id: chat.id },
        data: {
            messages: {
                create: {
                    date: newMessageData.date,
                    message: newMessageData.message,
                    typeMessage: newMessageData.typeMessage,
                    user: { connect: { id: newMessageData.userId } },
                },
            },
        },
    });
}

export async function deleteChatByChatId(chatId: string) {
    return await prisma.chat.deleteMany({
        where: { chatId: chatId },
    });
}
export async function deleteMessageById(id: string) {
    return await prisma.message.delete({
        where: { id: id },
    });
}

export async function getChatsWithUser(userAddress: string) {
    const user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
        include: {
            userChats: {
                include: {
                    chats: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error(`User with address ${userAddress} not found`);
    }

    return user.userChats.flatMap(userChats => userChats.chats);
}

export async function createOrUpdateUserWithChat(userAddress: string, chainId: string, chatId: string) {
    let user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                senderAddress: userAddress,
                avatar: "defaultAvatar", // Replace with actual avatar
                userName: "Default User", // Replace with actual user name
            },
        });
    }

    let userChats: any = await prisma.userChats.findFirst({
        where: { userId: user.id },
        include: {
            chains: true,
        },
    });

    if (!userChats) {
        userChats = await prisma.userChats.create({
            data: {
                user: { connect: { id: user.id } },
                chains: {
                    create: {
                        chainId: chainId,
                        name: `Chain ${chainId}`, // Replace with actual name
                        avatar: "defaultAvatar", // Replace with actual avatar
                    },
                },
            },
        });
    } else {
        const chain = userChats.chains.find((chain: any) => chain.chainId === chainId);

        if (!chain) {
            await prisma.chain.create({
                data: {
                    chainId: chainId,
                    name: `Chain ${chainId}`, // Replace with actual name
                    avatar: "defaultAvatar", // Replace with actual avatar
                    userChats: { connect: { id: userChats.id } },
                },
            });
        }
    }

    await prisma.chat.create({
        data: {
            chatId: chatId,
            userChats: { connect: { id: userChats?.id } },
        },
    });
}