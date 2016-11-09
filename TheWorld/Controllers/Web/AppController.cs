﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheWorld.Models;
using TheWorld.Services;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Web
{
    public class AppController : Controller
    {
        private IMailService _mailService;
        private IConfigurationRoot _config;
        private IWorldRepository _repository;

        public AppController(
            IMailService mailService, 
            IConfigurationRoot config,
            IWorldRepository repository)
        {
            _mailService = mailService;

            _config = config;

            _repository = repository;

        }

        public IActionResult Index()
        {
            var data = _repository.GetAllTrips();

            return View(data);
        }

        public IActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Contact(ContactViewModel viewModel)
        {
            if (viewModel.Email.EndsWith("aol.com"))
            {
                ModelState.AddModelError(nameof(viewModel.Email), "We don't support AOL addresses");
            }

            if (ModelState.IsValid)
            {
                _mailService.SendMail(_config["MailSettigs:ToAddress"], viewModel.Email, "From TheWorld", viewModel.Message);

                ModelState.Clear();

                ViewBag.UserMessage = "Message Sent!";
            }

            return View();
        }

        public IActionResult About()
        {
            return View();
        }
    }
}
