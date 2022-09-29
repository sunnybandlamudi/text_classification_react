import styles from "./TextArea.module.css"
import {useRef, useState} from "react";
import axios from "axios";

function TextArea() {

    const textarea_ref = useRef();
    const [prediction, setPrediction] = useState();
    console.log(prediction)

    function submit() {
        console.log(textarea_ref)
        let content = textarea_ref.current.value;
        console.log(content)

        axios.get('http://localhost:5000/getcategory/' + content).then(response => {
            console.log(response.data)
            setPrediction(response.data);
        })

    }

    function getBar(key){

        let percent = (prediction[key]*100).toFixed(2)+"%";
        console.log({"width":`${percent}`})
            return (
                <div className={styles.progress_container}>
                    <div className={styles.label}>
                        {key.toUpperCase()}
                    </div>
                    <div className={`progress ${styles.bar} ${styles.progress_bar}`} key={key}>

                        <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" style={{"width":`${percent}`}}
                             aria-valuemax="100">

                        </div>
                    </div>
                    {percent}
                </div>

            )
    }

    console.log(styles)
    return (
        <>
            <div className={`container ${styles.text_area_container}`}>
                <label htmlFor="text_area" className="form-label">Classification Text:</label>
                <textarea id="text_area" className={`form-control  ${styles.text_area}`} ref={textarea_ref}>

                </textarea>

                <div className={styles.display_propability}>

                    {/*{displayProp()}*/}

                    { prediction &&
                        Object.keys(prediction).map(key => getBar(key))

                    }

                </div>

                <button className={`btn btn-primary margin-top-50 ${styles.btn_submit} `} onClick={() => submit()}> Submit</button>
            </div>
        </>

    )
}


export default TextArea