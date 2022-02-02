import Link from "next/link";
import classes from './button.module.css';


function Button({link,children,onClick}) {
    const {btn} = classes;
    if(link){
        return (
           <Link href={link}>
               <a className={btn}>{children}</a>
           </Link>
        );
    }

    return (
        <button onClick={onClick} className={btn}>{children}</button>
     );
}

export default Button;