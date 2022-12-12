require('dotenv').config({});
const { Client } = require("twitter-api-sdk");

async function main(id) {
    const client = new Client(process.env.BEARER_TOKEN);

    const response = await client.spaces.findSpacesByCreatorIds({
        "user_ids": [
            id
        ],
        "space.fields": [
            "created_at",
            "creator_id",
            "ended_at",
            "host_ids",
            "id",
            "invited_user_ids",
            "is_ticketed",
            "lang",
            "participant_count",
            "scheduled_start",
            "speaker_ids",
            "started_at",
            "state",
            "subscriber_count",
            "title",
            "topic_ids",
            "updated_at"
        ],
        "expansions": [
            "creator_id",
            "host_ids",
            "speaker_ids"
        ],
        "topic.fields": [
            "description",
            "id",
            "name"
        ]
    });
    const data = response.data;
    data.forEach(function (dat) {
        console.log("Space:", dat.title, "status:", dat.state);
        const speakers = dat.speaker_ids;
        console.log("Speakers:")
        speakers?.forEach(async function(speaker) {
            const speakerData = await client.users.findUserById(
                speaker, {
                "user.fields": [
                    "created_at",
                    "description",
                    "entities",
                    "id",
                    "location",
                    "name",
                    "pinned_tweet_id",
                    "profile_image_url",
                    "protected",
                    "public_metrics",
                    "url",
                    "username",
                    "verified",
                    "withheld"
                ],
                "tweet.fields": [
                    "attachments",
                    "author_id",
                    "context_annotations",
                    "conversation_id",
                    "created_at",
                    "edit_controls",
                    "edit_history_tweet_ids",
                    "entities",
                    "geo",
                    "id",
                    "in_reply_to_user_id",
                    "lang",
                    "non_public_metrics",
                    "organic_metrics",
                    "possibly_sensitive",
                    "promoted_metrics",
                    "public_metrics",
                    "referenced_tweets",
                    "reply_settings",
                    "source",
                    "text",
                    "withheld"
                ]
            });
            console.log('\t',speakerData.data.name,'\n\t\t', speakerData.data.description);
        });
    }); 
}
  
main("1138690476612046848");