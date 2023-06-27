import e from 'express'
import puppeteer, { Page } from 'puppeteer'
import Driver, { driverType } from '~/models/schemas/Drivers.schemas'
import Team from '~/models/schemas/Teams.schemas'
import driverService from '~/services/driver.services'
const crawDriverController = async () => {
  // const browser = await puppeteer.launch()
  // const page = await browser.newPage()
  // await page.goto(`https://www.formula1.com/en/results/jcr:content/resultsarchive.html/2023/drivers.html`)
  // const selectElements = await page.$$('.resultsarchive-filter-form-select')
  // // Lấy các giá trị trong phần tử <select>
  // if (selectElements) {
  //   const selectElement = selectElements[0]
  //   const optionElements = await selectElement.$$('option')
  //   for (const optionElement of optionElements) {
  //     const text = await page.evaluate((el) => el.textContent, optionElement)
  //     console.log(text)
  //   }
  // for (const selectElement of selectElements) {
  //   const optionElements = await selectElement.$$('option')
  //   for (const optionElement of optionElements) {
  //     const text = await page.evaluate((el) => el.textContent, optionElement)
  //     console.log(text)
  //   }
  // }
  // }

  //Craw data sine 2023 --> 1958
  // scrapeDataDriver()
  // craw data race sine 2023 -->1958

  //eslint-disable-next-line for-direction
  for (let year = 2023; year >= 2023; year--) {
    scrapeDataRace(year)
      .then((data) => {
        return crawRaceResultByCountry(data)
      })
      .then((data) => {
        console.log(data)
      })
  }
}

async function scrapeDataRace(year: number) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/races.html`)
  const results = await page
    .$$eval('.resultsarchive-table tbody tr', (rows) =>
      rows.map((row) => ({
        grandPrix: row.querySelector('td:nth-child(2) a')?.textContent?.trim() as any,
        date: row.querySelector('td:nth-child(3)')?.textContent?.trim(),
        time: row.querySelector('td:nth-child(7)')?.textContent?.trim(),
        key: ''
      }))
    )
    .then(async (res) => {
      const selectElements = await page.$$('.resultsarchive-filter-form-select')
      if (selectElements) {
        const selectElement = selectElements[2]
        const optionElements = await selectElement.$$('option')
        //lấy các option
        for (const option of optionElements) {
          //lấy value trong option
          const value = (await option?.evaluate((node) => node.value)) as string
          // const text = await option?.evaluate((node) => node.textContent?.trim())
          //kiem tra neu value khong bang null
          if (value.split('/')[1]) {
            const data = res.find(
              (result) =>
                result.grandPrix ===
                value
                  .split('/')[1]
                  .replace('-', ' ')
                  .split(' ')
                  .map((value) => value.charAt(0).toUpperCase() + value.slice(1)) //sử lý chuổi
                  .join(',')
                  .replace(',', ' ')
            )
            if (data) {
              data.key = value
            }
          }
        }
        return res
      }
    })
  // await page
  //   .$$eval('.resultsarchive-table tbody tr', (rows) =>
  //     rows.map((row) => ({
  //       grandPrix: row.querySelector('td:nth-child(2) a')?.textContent?.trim() as any,
  //       date: row.querySelector('td:nth-child(3)')?.textContent?.trim(),
  //       time: row.querySelector('td:nth-child(7)')?.textContent?.trim()
  //     }))
  //   )
  // .then(async (res) => {
  //   const selectElements = await page.$$('.resultsarchive-filter-form-select')
  //   if (selectElements) {
  //     const selectElement = selectElements[2]
  //     const optionElements = await selectElement.$$('option')
  //     for (const option of optionElements) {
  //       const value = (await option?.evaluate((node) => node.value)) as string
  //       const text = await option?.evaluate((node) => node.textContent?.trim())

  //       if (value.split('/')[1]) {
  //         value
  //           .split('/')[1]
  //           .replace('-', ' ')
  //           .split(' ')
  //           .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
  //         console.log(
  //           value
  //             .split('/')[1]
  //             .replace('-', ' ')
  //             .split(' ')
  //             .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
  //             .join(',')
  //             .replace(',', ' '),
  //           value
  //         )
  //       }
  //     }
  //   }

  //   // await browser.close()
  //   // Lấy các giá trị trong phần tử <select>
  //   // if (selectElements) {
  //   //   const selectElement = selectElements[2]
  //   //   const optionElements = await selectElement.$$('option')
  //   //   console.log(selectElements.length)

  //   //   for (const optionElement of optionElements) {
  //   //     const text = await page.evaluate((el) => el.value, optionElement)
  //   //     // if (optionElement - 1 < res.length) {
  //   //     //   // const fixText = text.split('/')[1]
  //   //     //   console.log(text)
  //   //     //   res[optionElement - 1] = {
  //   //     //     grandPrix: {
  //   //     //       country: res[optionElement - 1].grandPrix,
  //   //     //       key: text
  //   //     //     },
  //   //     //     date: res[optionElement - 1].date,
  //   //     //     time: res[optionElement - 1].time
  //   //     //   }
  //   //     // }
  //   //     // console.log(res)
  //   //     console.log(text)
  //   //   }

  //   //   // for (const selectElement of selectElements) {
  //   //   //   const optionElements = await selectElement.$$('option')
  //   //   //   for (const optionElement of optionElements) {
  //   //   //     const text = await page.evaluate((el) => el.textContent, optionElement)
  //   //   //     console.log(text)
  //   //   //   }
  //   //   // }
  //   // }
  // })
  // console.log(data)

  await browser.close()
  return results
}
async function scrapeDataDriver() {
  /*eslint for-direction: "error"*/
  for (let year = 2023; year >= 1958; year--) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/drivers.html`)
    const driverStandings = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table.resultsarchive-table tbody tr'))
      return rows.map((row) => {
        // const position = row.querySelector('td:nth-child(2)')?.textContent?.trim()
        const driver = row.querySelector('td:nth-child(3) a')?.textContent?.replace(/\n\s+/g, ' ').trim()
        const nationality = row.querySelector('td:nth-child(4)')?.textContent?.trim()
        const team = row.querySelector('td:nth-child(5) a')?.textContent?.trim()
        // const points = row.querySelector('td:nth-child(6)')?.textContent?.trim()

        // console.log(result)
        // return { position, driver, nationality, result, points } as any
        return { driver, team, nationality } as any
      })
    })
    for (let i = 0; i < driverStandings.length; i++) {
      const result = await driverService.find(driverStandings[i].driver as string)
      if (!result) {
        const driver = {
          driver: driverStandings[i].driver,
          country: driverStandings[i].nationality,
          team: [
            {
              car: driverStandings[i].team,
              date: new Date(`${year}`)
            }
          ]
        }
        await driverService.create(driver as driverType)
      } else {
        if (result.team[result.team.length - 1].car !== driverStandings[i].team) {
          result.team.push({
            car: driverStandings[i].team,
            date: new Date(`${year}`)
          })
          await driverService.update(result)
        }
      }
    }
    // console.log(driverStandings)
    await browser.close()
  }
}
async function crawRaceResultByCountry(data: any) {
  for (const countryIndex in data) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(
      `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${
        data[countryIndex].date.split(' ')[data[countryIndex].date.split(' ').length - 1]
      }/races/${data[countryIndex].key}/race-result.html`
    )
    const RaceResult = await page
      .evaluate(() => {
        const rows = Array.from(document.querySelectorAll('table.resultsarchive-table tbody tr'))
        return rows.map((row) => {
          const no = parseFloat(`${row.querySelector('td:nth-child(3)')?.textContent?.trim()}`)
          const driver = row.querySelector('td:nth-child(4)')?.textContent?.replace(/\n\s+/g, ' ').trim()
          const laps = parseFloat(`${row.querySelector('td:nth-child(6)')?.textContent?.trim()}`)
          const timeRetried = row.querySelector('td:nth-child(7)')?.textContent?.trim()
          const pts = parseFloat(`${row.querySelector('td:nth-child(8)')?.textContent?.trim()}`)
          // const points = row.querySelector('td:nth-child(6)')?.textContent?.trim()

          // console.log(result)
          // return { position, driver, nationality, result, points } as any
          return { no, driver, laps, timeRetried, pts } as any
        })
      })
      .then((res) => {
        //craw FastestLapsByCountry
        return crawFastestLapsByCountry(
          page,
          res,
          `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${
            data[countryIndex].date.split(' ')[data[countryIndex].date.split(' ').length - 1]
          }/races/${data[countryIndex].key}/fastest-laps.html`
        )
      })
      .then((res) => {
        return crawPitStopSummary(
          page,
          res,
          `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${
            data[countryIndex].date.split(' ')[data[countryIndex].date.split(' ').length - 1]
          }/races/${data[countryIndex].key}/pit-stop-summary.html`
        )
      })
      .then((res) => {
        return crawStartingGrid(
          page,
          res,
          `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${
            data[countryIndex].date.split(' ')[data[countryIndex].date.split(' ').length - 1]
          }/races/${data[countryIndex].key}/starting-grid.html`
        )
      })
    console.log(RaceResult, '----266---')
  }
  return data
}
async function crawFastestLapsByCountry(page: Page, res: any, url: string) {
  await page.goto(url)
  const FastestLaps = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table.resultsarchive-table tbody tr'))
    return rows.map((row) => {
      const no = parseFloat(`${row.querySelector('td:nth-child(3)')?.textContent?.trim()}`)
      const lap = parseFloat(`${row.querySelector('td:nth-child(6)')?.textContent?.trim()}`)
      const time_of_day = row.querySelector('td:nth-child(7)')?.textContent?.trim()
      const time = row.querySelector('td:nth-child(8)')?.textContent?.trim()
      const avg_speed = parseFloat(`${row.querySelector('td:nth-child(9)')?.textContent?.trim()}`)
      return { no, lap, time_of_day, time, avg_speed } as any
    })
  })
  for (const fastestLap of FastestLaps) {
    const result = res.find((res: any) => res.no === fastestLap.no)
    if (result) {
      result.fastest_lap = {
        lap: fastestLap.lap,
        time_of_day: fastestLap.time_of_day,
        time: fastestLap.time,
        avg_speed: fastestLap.avg_speed
      }
    }
  }
  return res
}
async function crawPitStopSummary(page: Page, res: any, url: string) {
  await page.goto(url)
  const PitStopSummary = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table.resultsarchive-table tbody tr'))
    return rows.map((row) => {
      const no = parseFloat(`${row.querySelector('td:nth-child(3)')?.textContent?.trim()}`)
      const lap = parseFloat(`${row.querySelector('td:nth-child(6)')?.textContent?.trim()}`)
      const time_of_day = row.querySelector('td:nth-child(7)')?.textContent?.trim()
      const time = row.querySelector('td:nth-child(8)')?.textContent?.trim()
      const total = parseFloat(`${row.querySelector('td:nth-child(9)')?.textContent?.trim()}`)
      return { no, lap, time_of_day, time, total } as any
    })
  })
  for (const pitStop of PitStopSummary) {
    const result = res.find((res: any) => res.no === pitStop.no)
    if (result) {
      if (!result.pit_stop_summary) {
        result.pit_stop_summary = []
      }

      result.pit_stop_summary.push({
        lap: pitStop.lap,
        time_of_day: pitStop.time_of_day,
        time: pitStop.time,
        total: pitStop.total
      })
    }
  }
  return res
}
async function crawStartingGrid(page: Page, res: any, url: string) {
  await page.goto(url)
  const CrawStartingGrid = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table.resultsarchive-table tbody tr'))
    return rows.map((row) => {
      const pos = parseFloat(`${row.querySelector('td:nth-child(2)')?.textContent?.trim()}`)
      const no = parseFloat(`${row.querySelector('td:nth-child(3)')?.textContent?.trim()}`)
      const time = row.querySelector('td:nth-child(6)')?.textContent?.trim()

      return { pos, no, time } as any
    })
  })
  for (const StartingGrid of CrawStartingGrid) {
    const result = res.find((res: any) => res.no === StartingGrid.no)
    if (result) {
      result.stating_grid = { pos: StartingGrid.pos, time: StartingGrid.time }
    }
  }
  return res
}
crawDriverController()
