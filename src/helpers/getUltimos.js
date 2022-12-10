
export const getUltimos = async () => {

    const resp = await fetch('https://ticket-app-server-production.up.railway.app/ultimos');
    const data = await resp.json();

    return data.ultimos;

}
