
const map= new Map();

function setMapdata(Id,user)
{
    map.set(Id,user);
}

function getMapdata(Id)
{
    return map.get(Id);
}

module.exports = {
    setMapdata,
    getMapdata,
}