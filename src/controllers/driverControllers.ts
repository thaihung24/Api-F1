import { Request, Response, NextFunction } from 'express'
import puppeteer from 'puppeteer'
import axios from 'axios'
import teamService from '~/services/driver.services'
import driverService from '~/services/driver.services'
import raceResultService from '~/services/raceResult.service'
export const getDriverController = async (req: Request, res: Response, next: NextFunction) => {
  const { driver } = req.body
  // console.log(car)
  try {
    const result = await raceResultService.findByDriverId(driver)
    console.log(driver)
    return res.json({
      message: 'Success',
      data: result
    })
  } catch (error) {
    console.log(error)
    throw error
  }
  // const browser = await puppeteer.launch()
  // const page = await browser.newPage()
  // await page.goto(`https://www.formula1.com/en/results/jcr:content/resultsarchive.html/2023/drivers.html`)
  // // Định vị phần tử <select> bằng CSS selector
  // const selectElements = await page.$$('.resultsarchive-filter-form-select')

  // // Lấy các giá trị trong phần tử <select>
  // if (selectElements) {
  //   for (const selectElement of selectElements) {
  //     const optionElements = await selectElement.$$('option')
  //     for (const optionElement of optionElements) {
  //       const text = await page.evaluate((el) => el.textContent, optionElement)
  //       console.log(text)
  //     }
  //   }
  // }
  // await browser.close()
}
