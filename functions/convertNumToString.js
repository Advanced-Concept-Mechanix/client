export default function convertNum(num){
    return num.toString(20).slice(2) + num.toString(25).slice(2) + num.toString(30).slice(2) + num.toString(35).slice(2);
}