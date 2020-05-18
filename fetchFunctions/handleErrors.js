export default function handleErrors(response) {
    if (response.Error) {
        throw Error(response.statusText);
    }
    return response;
}