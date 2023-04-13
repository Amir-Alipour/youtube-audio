const express = require("express");
var youtubeSuggest = require("youtube-suggest");
const YoutubeStream = require("youtube-stream-url");
const yts = require("yt-search");

const app = express();
const port = 3001;
app.use(express.static("public"));

// ===================================
app.get("/:token/get", async (req, res) => {
    if (req.params.token === "a@1aa1-13haf--31bbnlm") {
        let result = await YoutubeStream.getInfo({
            url: `https://www.youtube.com/watch?v=${req.query.id}`,
        });
        res.send({
            videoDetail: result.videoDetails,
            download_link: {
                mp4: result.formats.filter((format) => format.itag === 140)[0],
                webm: result.formats.filter((format) => format.itag === 251)[0],
            },
        });
    } else {
        res.send("token not found!");
    }
});
// ===================================

// ===================================
app.get("/:token/suggest", async (req, res) => {
    if (req.params.token === "a@1aa1-13haf--31bbnlm") {
        let result = await youtubeSuggest(req.query.q);
        res.send({ result });
    } else {
        res.send("token not found!");
    }
});

app.get("/:token/search", async (req, res) => {
    if (req.params.token === "a@1aa1-13haf--31bbnlm") {
        let result = await yts(req.query.q);
        res.send({ result });
    } else {
        res.send("token not found!");
    }
});
// ===================================

app.get("/", async (req, res) => {
    res.set("Content-Type", "text/html");
    res.send(
        Buffer.from(`
        <h1> for use this API you need token </h1>
        <table style="font-family: sans-serif; border-collapse: collapse; ">
            <tr>
                <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Route</th>
                <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Query</th>
                <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Description</th>
            </tr>
            <tr>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">/</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"></td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">home page of API</td>
            </tr>
            <tr>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">/:token/suggest</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">?q=[query]</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">get suggest for your searching text</td>
            </tr>
            <tr>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">/:token/search</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">?q=[query]</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">search in youtube</td>
            </tr>
            <tr>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">/:token/get</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">?id=[youtube video ID]</td>
                <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">get song download details</td>
            </tr>
        </table>
    `)
    );
});

app.get("*", async (req, res) => {
    res.send("WHAT ?! what you want? .. get help at first page");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});