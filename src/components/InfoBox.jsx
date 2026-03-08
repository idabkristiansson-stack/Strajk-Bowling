import {useState} from "react";

function InfoBox() {
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

        return (
            <>
        <h2>Show / Hide</h2>
        <button onClick={toggle}>{open ? 'Hide' : 'Show'}</button>

        {open && <p>Here is some hidden information that is only visable when open is true.</p>}
   </> 
   )
}

export default InfoBox;