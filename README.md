Load test with clinic and autoCannon
5k requests with 5 connections
┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬───────┐
│ Stat │ 2.5% │ 50% │ 97.5% │ 99% │ Avg │ Stdev │ Max │
├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼───────┤
│ Latency │ 6 ms │ 9 ms │ 19 ms │ 24 ms │ 10.2 ms │ 3.85 ms │ 59 ms │
└─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴───────┘
┌───────────┬───────┬───────┬────────┬────────┬────────┬─────────┬───────┐
│ Stat │ 1% │ 2.5% │ 50% │ 97.5% │ Avg │ Stdev │ Min │
├───────────┼───────┼───────┼────────┼────────┼────────┼─────────┼───────┤
│ Req/Sec │ 282 │ 282 │ 477 │ 525 │ 454.55 │ 70.89 │ 282 │
├───────────┼───────┼───────┼────────┼────────┼────────┼─────────┼───────┤
│ Bytes/Sec │ 90 kB │ 90 kB │ 152 kB │ 168 kB │ 145 kB │ 22.6 kB │ 90 kB │
└───────────┴───────┴───────┴────────┴────────┴────────┴─────────┴───────┘

Req/Bytes counts sampled once per second.

5k requests in 11.06s, 1.59 MB read

**Commands**

#### To run clinic

```shell
  "clinic": "clinic doctor -- node index.js",
```

#### To run autocannon

```shell
    "autocannon": "autocannon -c 5 -a 1500 localhost:3001"
```