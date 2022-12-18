export function getJSONRequest(body: any){
    return new Response(body, { headers: { 'Content-Type': 'application/json' }}).json()
}