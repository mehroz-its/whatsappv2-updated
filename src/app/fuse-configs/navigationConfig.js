import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import Alert from '@material-ui/lab/Alert';
import navigationConfig from "./navigation";

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

let userAcl = localStorage.getItem('user_acl');

let navigationBar = []

if (userAcl && navigationConfig && navigationConfig.length) {

    userAcl = JSON.parse(userAcl);


    if (userAcl && Object.keys(userAcl) && Object.keys(userAcl).length) {
        let keys = Object.keys(userAcl);
        userAcl = keys.filter(key => userAcl[key])
        navigationBar = [
            {
                id: navigationConfig[0].id,
                title: navigationConfig[0].title,
                translate: navigationConfig[0].translate,
                type: navigationConfig[0].type,
                icon: navigationConfig[0].icon,
                children: []
            }
        ]
        if (navigationConfig[0].children && navigationConfig[0].children.length) {

            function urlInACL(url) {
                return userAcl.includes("FRONT:" + url)
            }

            function parseChildren(child) {
                let result = []
                if (child && child.length) {
                    result = child.map(item => {
                        if (item) {
                            if (item.children && item.children.length) {
                                item.children = parseChildren(item.children)
                                item.children = item.children.filter(el => el)
                                if (item.children && item.children.length) {
                                    return item
                                }
                            } else if (item.url && urlInACL(item.url)) {
                                return item
                            }
                        }
                    })
                }
                return result.filter(el => el)
            }


            navigationBar[0].children = parseChildren(navigationConfig[0].children)
        }
    }
}
export default navigationBar;