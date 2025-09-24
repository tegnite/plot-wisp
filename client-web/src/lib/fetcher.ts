export const fetcher = async (data : any) => {
    try {
        // cookies
        // body process
            // if formdata => header['Content-Type'] = 'formdata'
            // else data => json => header['Content-Type'] = 'application/json'
        //
        const res  = await fetch('/url');
        if(!res.ok) {
            return new Error('something went wrong')
        }
    } catch (e) {
        return new Error((e as Error)?.message || 'something went wrong')
    }
};
