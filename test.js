
import rhub from './index.js';

(async () => {
    const ver = await rhub.get_latest_cran_version("cli");
    console.log(ver);

    const url = await rhub.get_cran_pkg_url("cli", "1.0.0");
    console.log(url);

    const url2 = await rhub.get_cran_pkg_url("cli");
    console.log(url2);    
})();
