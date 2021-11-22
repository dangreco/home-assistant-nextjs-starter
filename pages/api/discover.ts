import { camelCase } from "lodash";
import MDNS from "multicast-dns";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve) => {
    let found = false;
    const mdns = MDNS();

    mdns.on('response', (response) => {
      if (response.answers.some((a) => a.name === '_home-assistant._tcp.local')) {
        found = true;
        const txtRecord = response.additionals.find(
          (a) => a.type === 'TXT'
        );

        // @ts-ignore
        const buffers: Buffer[] = txtRecord.data.map(
          (data) => data
        );

        const data = Object.fromEntries(
          buffers.map(
            (buf) => {
              const [key, val] = buf.toString('utf-8').split('=');

              return [
                camelCase(key), 
                val === 'True' ? true :
                val === 'False' ? false :
                val
              ];
            }
          )
        )

        resolve(res.json(data));
      }
    });

    mdns.query({
      questions: [
        {
          type: 'PTR',
          name: '_home-assistant._tcp.local'
        },
      ],
    });

    setTimeout(() => {
      mdns.destroy();
      if (!found) {
        resolve(res.json({}));
      }
    }, 1000);
  });
};

export default handler;
