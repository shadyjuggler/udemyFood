const urlObj = {
    
}


 
function showCurrentURL() {
    const protocol = 'https',
    domain =  'mysite.com';


    const extractCurrDomain = () => {
        return this.domain;
    }
    const extractCurrProtocol = () => {
        return this.protocol;
    }
 
    console.log(`${extractCurrProtocol()}://${extractCurrDomain()}`)
}
 
const url = showCurrentURL.bind();
 
console.log(url);