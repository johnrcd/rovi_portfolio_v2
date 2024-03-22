let last_y;
let upwards_y = 0;

const main = () => {
    last_y = scrollY;
    document.addEventListener("scroll", (_event) => {
        updateMainNavigationBar();
        updateScrollDownArrow();
    });
    autoShowMainNavigationBarOnIdle();
}

const updateMainNavigationBar = () => {
    const current_y = scrollY;
    const scroll_up_threshold = 100;
    const nav = document.getElementById("top_navigation_bar");

    // down
    if (current_y > last_y) {
        nav.className = "scroll_down";
        upwards_y = 0;

    } 
    // up
    else {
        upwards_y += Math.abs(current_y - last_y);
        nav.className =
            upwards_y > scroll_up_threshold ?
            "scroll_up" :
            "scroll_down";
    }
    last_y = current_y;
}

const updateScrollDownArrow = () => {
    const arrow = document.getElementById("down_arrow");

    arrow.className = "fade_out";
}

const autoShowMainNavigationBarOnIdle = async() => {
    await new Promise(() => {
        setTimeout(() => {
            const current_y = scrollY;
            if (current_y !== 0) return;
            const nav = document.getElementById("top_navigation_bar");
            nav.className = "scroll_up";
        },
        2500 // ms
      );
    });
}


// why don't timeouts give promises...
// https://stackoverflow.com/a/63439351
const timeout = async(seconds) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            console.log('bla bla');
            resolve();
        },
        seconds * 1000
      );
    });
  }

document.addEventListener("DOMContentLoaded", (_e) => { main(); });