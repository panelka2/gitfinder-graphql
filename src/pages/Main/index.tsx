import { SearchInput } from '../../components/SearchInput';
import { List } from '../../components/List';
import styles from './main.module.scss'

export const Main = () => {
    return (
        <div>
            <div className={styles.block}>
                <SearchInput/>
            </div>
            <List/>
        </div>
    );
};
