export function createNewProtocol(){
    const generatedProtocols = new Set();

    function generateProtocol() {
        let protocol;
        do {
        protocol = Math.random().toString(36).substring(2, 10).toUpperCase();
        } while (generatedProtocols.has(protocol));
        generatedProtocols.add(protocol);
  
        return protocol;
    }

    const createProtocol = generateProtocol()

    return createProtocol
}