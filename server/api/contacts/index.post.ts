// server/api/subscribe.js o .ts si usas TypeScript

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email } = body || {};

    if (!email) {
        return {
            success: false,
            message: 'El campo "email" es obligatorio.',
        };
    }

    try {
        const response = await subscribeUserToBrevo(email);
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        const statusCode = error?.statusCode || error?.response?.status;

        if (statusCode === 400) {
            return {
                success: false,
                message: 'El email ya ha sido registrado.',
            };
        }

        console.error('Error al suscribir contacto:', error);

        return {
            success: false,
            message: 'Error inesperado al intentar registrar el email.',
        };
    }
});

const subscribeUserToBrevo = async (email: string) => {
    const config = useRuntimeConfig();
    const listId = Number(process.env.BREVO_LIST_ID);
    const apiKey = config.brevoApiKey;

    if (!listId || !apiKey) {
        throw new Error('Faltan las variables de entorno BREVO_LIST_ID o BREVO_API_KEY');
    }

    const payload = {
        email,
        listIds: [listId],
    };

    return await $fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': apiKey,
        },
        body: payload,
    });
};
