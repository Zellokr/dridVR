export default defineEventHandler(async (event) => {
    try {
        const response = await $fetch('https://api.brevo.com/v3/contacts', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'api-key': process.env.BREVO_API_KEY || '',
            },
        });

        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.error('Error al obtener contactos de Brevo:', error);

        // Devuelve un error claro al cliente
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'No se pudieron obtener los contactos de Brevo.',
        }));
    }
});
