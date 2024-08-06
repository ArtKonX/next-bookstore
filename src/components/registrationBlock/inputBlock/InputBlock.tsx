import styles from './InputBlock.module.scss'

type InputBlockType = {
    label: string;
    id: string;
    placeholder: string;
    register: any;
}

const InputBlock = ({
    label,
    id,
    placeholder,
    register
}: InputBlockType) => {

    return (
        <div className={styles['input-block']}>
            <label className={styles['input-block__label']} htmlFor={id}>
                {label}
            </label>
            <input
                type={id === 'password' || id === 'confirmPassword' ? 'password' : 'text'}
                className={styles['input-block__input']}
                id={id}
                placeholder={placeholder}
                {...register}
                required
            />
        </div>
    );
};

export default InputBlock;