export const frameStyle = `
.frame {
    width: 30px;
    height: 30px;
    background-color: red;
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 9999;
}

.frame.active{
    background-color: blue;
    width: 300px;
    height: 300px;
}
.content{
    display: none;
}
.content.active{
    display: block;
    height: 100%;
}
.todo-form{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0.5em;
}
.list-item{
    list-style: none;
    margin: 1em;
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    padding: 0.7em;
}
.list-item > span {
    display: flex;
    justify-content: center;
    align-items: center;
}
.frame-button{
    background: #64a0ed;
    border: none;
    padding: 0.5em;
    border-radius: 0.2em;
    color: #fff
}
`;

// .frame:hover{
//     background-color: blue;
//     width: 300px;
//     height: 300px;
// }
