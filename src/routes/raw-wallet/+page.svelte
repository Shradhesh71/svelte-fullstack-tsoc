<!-- <script lang="ts">
    import { PrivateKey } from '@bsv/sdk'
    
    let WIF:string
    let address:string
    
    function createKeys () {
    
        const privKey = PrivateKey.fromRandom()
        WIF = privKey.toWif()
        console.log("Private Key WIF format is ", WIF)
        address = privKey.toAddress()
        console.log("Your bitcoin address is ", address)
    }
    
    </script>
    
    <section>
        <button class=" bg-black text-white p-2 rounded mx-auto" on:click={createKeys}> Generate New Wallet Keys </button>
        <p>Private Key WIF format is {WIF}</p>
        <p>Your BitCoin Address is {address}</p>
    </section>
    
     -->

     <script lang="ts">
        import {PrivateKey} from "@bsv/sdk"
    
        let WIF:string
        let address:string
    
        function createKeys(){
    
            const privKey = PrivateKey.fromRandom()
            WIF = privKey.toWif()
            console.log("Private key: WIF format: ", WIF)
            address = privKey.toAddress()
            console.log("Your bitcoin address: ", address)
        }
    </script>
    
    <section>
        <div
      class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
    >
        <button class="bg-green-700 hover:bg-blue-700 text-white font-bold mb-5 ml-2 px-2 rounded" on:click={createKeys}>Generative New Wallet Keys</button>
        {#if WIF}
        <p>Private key WIF format is <span class="text-blue-600">{WIF}</span></p>
        <p>Address of your bitcoin is <span class="text-blue-600">{address}</span></p>
        {:else}
        <p> Click the above button</p>
        {/if}
    
        </div>
    </section>