'use server';
import { PrismaClient, Prisma, ChatType } from '@prisma/client';
import { getChainName } from '../components/shared/chainNames';

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

export async function createUserChat(userAddress: string, chainId: string, chatId: string, type: ChatType) {
    const user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
    });

    if (!user) {
        throw new Error(`User with address ${userAddress} not found`);
    }
    const chainData = getChainName(chainId);
    const avatarUrl = `https://raw.githubusercontent.com/spreadzp/icon-assets/main/assets/chains/${chainData.coinName}/${chainData.coinName}.png`

    const userChats = await prisma.userChats.create({
        data: {
            user: { connect: { id: user.id } },
            chains: {
                create: {
                    chainId: chainId,
                    name: chainData.name,
                    avatar: avatarUrl,
                },
            },
        },
    });
    await prisma.chat.create({
        data: {
            chatId: chatId,
            url: "",
            name: "",
            type,
            userChats: { connect: { id: userChats.id } },
        },
    });

    return userChats;
}

export async function createGeneralChat(userAddress: string, chatId: string, url: string, name: string, type: ChatType) {
    const user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
    });

    if (!user) {
        throw new Error(`User with address ${userAddress} not found`);
    }

    const userChats = await prisma.userChats.create({
        data: {
            user: { connect: { id: user.id } },

        },
    });
    await prisma.chat.create({
        data: {
            chatId,
            url,
            type,
            name,
            userChats: { connect: { id: userChats.id } },
        },
    })

    return userChats;
}

export async function getUserChatsByUserAddress(userAddress: string) {
    const chats = await getChatsWithUser(userAddress);

    // Transform the data into the desired format
    const transformedChats = chats.map(chat => {
        const chain = chat.userChats.chains[0]; // Assuming there's always at least one chain
        const messages = chat.userChats.chats[0].messages; // Assuming there's always at least one chat

        return {
            chatId: chat.chatId,
            chainId: chain.chainId,
            chainName: chain.name,
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
    return await prisma.chat.findMany({
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
                            messages: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
            },
        }
    });
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
            url: "",
            name: "",
            type: ChatType.Private,
            userChats: { connect: { id: userChats?.id } },
        },
    });
}

export async function inboxChatsByUserAddress(userAddress: string) {
    // Fetch all chats where the user is involved
    const chats = await getChatsWithUser(userAddress);

    // Filter chats where the last message is not from the user
    const filteredChats = chats.filter(chat => {
        const lastMessage = chat.userChats.chats[0].messages.reduce((prev, current) =>
            (prev.date > current.date) ? prev : current
        );
        return lastMessage.user.senderAddress !== userAddress;
    });

    // Transform the data into the desired format
    const transformedChats = filteredChats.map(chat => {
        const chain = chat.userChats.chains[0]; // Assuming there's always at least one chain
        const lastMessage = chat.userChats.chats[0].messages.reduce((prev, current) =>
            (prev.date > current.date) ? prev : current
        );

        return {
            chatId: chat.chatId,
            chainId: chain.chainId,
            chainName: chain.name,
            avatar: chain.avatar,
            dateMessage: lastMessage.date,
        };
    });

    return transformedChats;
}

export async function getGeneralChatsWithUser(userAccount: string) {
    try {
        // Find the UserChats associated with the userAccount
        const userChats = await prisma.userChats.findMany({
            where: {
                user: {
                    senderAddress: userAccount,
                },
            },
            include: {
                chats: true, // Include the chats associated with the UserChats
            },
        });

        // Filter the chats to include only those with type 'General'
        const generalChats = userChats
            .flatMap(userChat => userChat.chats)
            .filter(chat => chat.type === ChatType.General);

        return generalChats;
    } catch (error) {
        console.error("Error fetching general chats:", error);
        throw error;
    }
}

export async function getGeneralChats() {
    const chats = await prisma.chat.findMany({
        where: {
            type: ChatType.General,
        },
        include: {
            messages: true
        },
    });

    return chats.map((chat) => {
        return {
            name: chat.name,
            url: chat.url,
            type: chat.type,
            messages: chat.messages.length,
            chatId: chat.chatId,
        };
    });
}

export async function addUserToChat(userAddress: string, chatId: string) {
    const user = await prisma.user.findFirst({
        where: { senderAddress: userAddress },
    });

    if (!user) {
        throw new Error(`User with address ${userAddress} not found`);
    }

    const chat = await prisma.chat.findFirst({
        where: { chatId: chatId },
        include: {
            userChats: true,
        },
    });

    if (!chat) {
        throw new Error(`Chat with chatId ${chatId} not found`);
    }

    const userChats = await prisma.userChats.findFirst({
        where: {
            userId: user.id,
            chats: {
                some: {
                    id: chat.id,
                },
            },
        },
    });

    if (!userChats) {
        await prisma.userChats.create({
            data: {
                user: { connect: { id: user.id } },
                chats: { connect: { id: chat.id } },
            },
        });
    }
}

export async function getChatStatistics() {
    const userChats = await prisma.userChats.findMany({
        where: {
        },
        include: {
            chats: {
                include: {
                    messages: true,
                }
            },
            user: true
        },
    });

    // Filter the chats to include only those with type 'General'
    const generalChats = userChats
        .flatMap(userChat => userChat.chats)
        .filter(chat => chat.type === ChatType.General);

    const privateChats = userChats
        .flatMap(userChat => userChat.chats)
        .filter(chat => chat.type === ChatType.Private);

    let uniqueUsersInPrivateChats = new Set();
    privateChats.map((chat) => {
        chat.messages.forEach((message) => {
            uniqueUsersInPrivateChats.add(message.userId);
        })

    })
    const uniqueUsers = new Set();
    generalChats.map((chat) => {
        chat.messages.forEach((message) => {
            uniqueUsers.add(message.userId);
        })
        //const uniqueUsers = new Set(chat.userChatsId);

    })
    const generalChatStats = {
        type: ChatType.General,
        members: uniqueUsers.size,
        messages: generalChats.reduce((sum, chat) => sum + chat.messages.length, 0),
    }
    const privateChatStats = {
        type: ChatType.Private,
        members: uniqueUsersInPrivateChats.size,
        messages: privateChats.reduce((sum, chat) => sum + chat.messages.length, 0),
    }

    return [privateChatStats, generalChatStats];
}
