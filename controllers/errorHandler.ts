export default async ({response}: { response: any }, nextFn: Function) => {
    try {
        await nextFn();
    } catch (err) {
        response.status = 500;
        response.body = {msg: err.message};
    }
};