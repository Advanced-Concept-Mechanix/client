export default function createCsv(data){
    let csvContent = "data:text/csv;charset=utf-8,";

    data.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
}