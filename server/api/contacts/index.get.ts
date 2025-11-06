export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        const response = await $fetch('https://api.brevo.com/v3/contacts', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'api-key': config.brevoApiKey || '',
            },
        });

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error('Error al obtener contactos de Brevo:', error);

        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'No se pudieron obtener los contactos de Brevo.',
        }));
    }
});
