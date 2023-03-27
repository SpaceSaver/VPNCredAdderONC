onload = () => {
    const button = document.querySelector("#button");
    button.addEventListener("click", async () => {
        document.body.setAttribute("error", "false");
        const file = document.querySelector("#oncfile").files[0];
        const erroroutput = document.querySelector("#error");
        const downloadlink = document.querySelector("#download");
        let jsondata = {}
        try {
            jsondata = JSON.parse(await file.text());
        } catch(e) {
            document.body.setAttribute("error", "true");
            erroroutput.textContent = ("An error ocurred while parsing:\n" + e.toString());
            return;
        }
        try {
            jsondata.NetworkConfigurations[0].VPN.OpenVPN.Username = document.querySelector("#username").value;
            jsondata.NetworkConfigurations[0].VPN.OpenVPN.Password = document.querySelector("#password").value;
        } catch(e) {
            document.body.setAttribute("error", "true");
            erroroutput.textContent = ("An error ocurred while editing:\n" + e.toString());
            return;
        }
        try {
            const blob = new Blob([JSON.stringify(jsondata)], {type: "application/x-onc"});
            let namearray = file.name.split(".");
            namearray.splice(namearray.length - 1, 0, "withcreds");
            const name = namearray.join(".");
            downloadlink.setAttribute("download", name);
            downloadlink.href = URL.createObjectURL(blob);
            downloadlink.click();

        } catch(e) {
            document.body.setAttribute("error", "true");
            erroroutput.textContent = ("An error ocurred while saving:\n" + e.toString());
            return;
        }
    })
};