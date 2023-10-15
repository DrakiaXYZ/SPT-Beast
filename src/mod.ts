import { DependencyContainer } from "tsyringe";
import JSON5 from "json5";
import * as fs from "fs";
import path from "path";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";

class BEAST implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        const db = databaseServer.getTables();

        const pkg = this.loadJson("../package.json");

        const scavBuilds = this.loadJson("../builds/ScavBuilds.json5");
        db.bots.types.assault.inventory.mods = scavBuilds.mods;
        db.bots.types.cursedassault.inventory.mods = scavBuilds.mods;
        db.bots.types.crazyassaultevent.inventory.mods = scavBuilds.mods;
        db.bots.types.assault.chances = scavBuilds.chances;
        db.bots.types.cursedassault.chances = scavBuilds.chances;
        db.bots.types.crazyassaultevent.chances = scavBuilds.chances;

        // Clear unnecessary weights from PMCs and scavs
        this.clearWeights(botConfig);

        logger.log(`[${pkg.name}] "Bakardi's Personal" preset loaded.`, "blue");

        // Main Slot Weapons
        db.bots.types.assault.inventory.equipment.FirstPrimaryWeapon = {
            "5cadfbf7ae92152ac412eeef": 10,	// ASh-12 12.7x55 assault rifle
            // Shotguns
            "6259b864ebedf17603599e88": 5,	// Benelli M3 Super 90 dual-mode 12ga shotgun *
            "5e870397991fd70db46995c8": 50,	// Mossberg 590A1 12ga pump-action shotgun *
            "5a7828548dc32e5a9c28b516": 10,	// Remington Model 870 12ga pump-action shotgun *
            "54491c4f4bdc2db1078b4568": 80,	// MP-133 12ga pump-action shotgun *
            "56dee2bdd2720bc8328b4567": 80,	// MP-153 12ga semi-automatic shotgun *
            "606dae0ab0e443224b421bb7": 80,	// MP-155 12ga semi-automatic shotgun *
            "5580223e4bdc2d1c128b457f": 20,	// MP-43-1C 12ga double-barrel shotgun *
            "60db29ce99594040e04c4a27": 10,	// MTs-255-12 12ga shotgun *
            "576165642459773c7a400233": 40,	// Saiga 12ga ver.10 12/76 semi-automatic shotgun *
            "5a38e6bac4a2826c6e06d79b": 80,	// TOZ-106 20ga bolt-action shotgun *
            "5e848cc2988a8701445df1e8": 5,	// TOZ KS-23M 23x75mm pump-action shotgun *
            // .366 TKM
            "59e6687d86f77411d949b251": 90,	// Molot VPO-209 .366 TKM carbine *
            "5de652c31b7e3716273428be": 40,	// Molot VPO-215 "Gornostay" .366 TKM bolt-action rifle *
            //Grenade Launchers
            "5e81ebcd8e146c7080625e15": 1,	// FN40GL Mk2 40mm grenade launcher
            "6275303a9f372d6ea97f9ec7": 1,	// Milkor M32A1 MSGL 40mm grenade launcher
            // 5.45x39mm (smol AK)
            "628b5638ad252a16da6dd245": 0,	// SAG AK-545 5.45x39 carbine
            "628b9c37a733087d0d7fe84b": 0,	// SAG AK-545 Short 5.45x39 carbine
            "5ac66d9b5acfc4001633997a": 20,	// Kalashnikov AK-105 5.45x39 assault rifle *
            "5bf3e03b0db834001d2c4a9c": 10,	// Kalashnikov AK-74 5.45x39 assault rifle *
            "5ac4cd105acfc40016339859": 50,	// Kalashnikov AK-74M 5.45x39 assault rifle *
            "5644bd2b4bdc2d3b4c8b4572": 60,	// Kalashnikov AK-74N 5.45x39 assault rifle *
            "5bf3e0490db83400196199af": 15,	// Kalashnikov AKS-74 5.45x39 assault rifle *
            "5ab8e9fcd8ce870019439434": 20,	// Kalashnikov AKS-74N 5.45x39 assault rifle *
            "57dc2fa62459775949412633": 80,	// Kalashnikov AKS-74U 5.45x39 assault rifle *
            "583990e32459771419544dd2": 0,	// Kalashnikov AKS-74UN 5.45x39 assault rifle
            "5839a40f24597726f856b511": 0,	// Kalashnikov AKS-74UB 5.45x39 assault rifle
            "5beed0f50db834001c062b12": 0,	// RPK-16 5.45x39 light machine gun
            // .556/.300 Blackout
            "5c07c60e0db834002330051f": 80,	// ADAR 2-15 5.56x45 carbine *
            "5d43021ca4b9362eab4b5e25": 0,	// Lone Star TX-15 DML 5.56x45 carbine
            "5ac66cb05acfc40198510a10": 0,	// Kalashnikov AK-101 5.56x45 assault rifle
            "5ac66d015acfc400180ae6e4": 0,	// Kalashnikov AK-102 5.56x45 assault rifle
            "62e7c4fba689e8c9c50dfc38": 0,	// Steyr AUG A1 5.56x45 assault rifle
            "63171672192e68c5460cebc5": 0,	// Steyr AUG A3 5.56x45 assault rifle
            "5c488a752e221602b412af63": 0,	// Desert Tech MDR 5.56x45 assault rifle
            "5bb2475ed4351e00853264e3": 0,	// HK 416A5 5.56x45 assault rifle
            "623063e994fc3f7b302a9696": 0,	// HK G36 5.56x45 assault rifle
            "5447a9cd4bdc2dbd208b4567": 30,	// M4A1 Assault Rifle
            "6184055050224f204c1da540": 0,	// FN SCAR-L 5.56x45 assault rifle
            "618428466ef05c2ce828f218": 0,	// FN SCAR-L 5.56x45 assault rifle (FDE)
            "5fbcc1d9016cce60e8341ab3": 0,	// SIG MCX .300 Blackout assault rifle
            // PDW,SMG/9mm
            "59f9cabd86f7743a10721f46": 70,	// Saiga-9 9x19 carbine *
            "60339954d62c9b14ed777c06": 0,	// Soyuz-TM STM-9 Gen.2 9x19 carbine
            "58948c8e86f77409493f7266": 0,	// SIG MPX 9x19 submachine gun
            "5cc82d76e24e8d00134b4b83": 0,	// FN P90 5.7x28 submachine gun
            "62e14904c2699c0ec93adc47": 0,	// SR-2M "Veresk" 9x21 submachine gun
            "5926bb2186f7744b1c6c6e60": 0,	// HK MP5 9x19 submachine gun (Navy 3 Round Burst)
            "5d2f0d8048f0356c925bc3b0": 0,	// HK MP5K 9x19 submachine gun
            "5ba26383d4351e00334c93d9": 0,	// HK MP7A1 4.6x30 submachine gun
            "5bd70322209c4d00d7167b8f": 0,	// HK MP7A2 4.6x30 submachine gun
            "5e00903ae9dc277128008b87": 5,	// B&T MP9 9x19 submachine gun *
            "5de7bd7bfd6b4e6e2276dc25": 0,	// B&T MP9-N 9x19 submachine gun
            "5fc3f2d5900b1d5091531e57": 0,	// TDI KRISS Vector Gen.2 9x19 submachine gun
            "5fb64bc92b1b027b1f50bcf2": 0,	// TDI KRISS Vector Gen.2 .45 ACP submachine gun
            "5fc3e272f8b6a877a729eac5": 0,	// HK UMP .45 ACP submachine gun
            "57d14d2524597714373db789": 30,	// PP-91 "Kedr" 9x18PM submachine gun *
            "5ea03f7400685063ec28bfa8": 20,	// PPSh-41 7.62x25 submachine gun *
            // 7.62x39mm (Bik AK/SKS)
            "587e02ff24597743df3deaeb": 80,	// Simonov OP-SKS 7.62x39 carbine (Hunting Rifle Version) *
            "574d967124597745970e7c94": 80,	// Simonov SKS 7.62x39 carbine *
            "59e6152586f77473dc057aa1": 90,	// Molot VPO-136 "Vepr-KM" 7.62x39 carbine *
            "5ac66d2e5acfc43b321d4b53": 0,	// Kalashnikov AK-103 7.62x39 assault rifle
            "5ac66d725acfc43b321d4b60": 10,	// Kalashnikov AK-104 7.62x39 assault rifle *
            "59d6088586f774275f37482f": 40,	// Kalashnikov AKM 7.62x39 assault rifle *
            "5a0ec13bfcdbcb00165aa685": 0,	// Kalashnikov AKMN 7.62x39 assault rifle
            "59ff346386f77477562ff5e2": 25,	// Kalashnikov AKMS 7.62x39 assault rifle *
            "5abcbc27d8ce8700182eceeb": 0,	// Kalashnikov AKMSN 7.62x39 assault rifle
            "606587252535c57a13424cfd": 0,	// CMMG Mk47 Mutant 7.62x39 assault rifle
            "628a60ae6b1d481ff772e9c8": 0,	// Rifle Dynamics RD-704 7.62x39 assault rifle
            // 7.62x51mm NATO (Bik AR, three 'o' hate)
            "5f2a9575926fd9352339381f": 0,	// Kel-Tec RFB 7.62x51 rifle
            "5c501a4d2e221602b412b540": 50,	// Molot VPO-101 "Vepr-Hunter" 7.62x51 carbine *
            "5dcbd56fdbd3d91b3e5468d5": 0,	// Desert Tech MDR 7.62x51 assault rifle
            "5b0bbe4e5acfc40dc528a72d": 0,	// DS Arms SA-58 7.62x51 assault rifle
            "6183afd850224f204c1da514": 0,	// FN SCAR-H 7.62x51 assault rifle
            "6165ac306ef05c2ce828ef74": 0,	// FN SCAR-H 7.62x51 assault rifle (FDE)
            "6176aca650224f204c1da3fb": 0,	// HK G28 7.62x51 marksman rifle
            "5aafa857e5b5b00018480968": 0,	// Springfield Armory M1A 7.62x51 rifle
            "5a367e5dc4a282000e49738f": 0,	// Remington R11 RSASS 7.62x51 marksman rifle
            "5df8ce05b11454561e39243b": 0,	// Knight's Armament Company SR-25 7.62x51 marksman rifle
            "588892092459774ac91d4b11": 0,	// Lobaev Arms DVL-10 7.62x51 bolt-action sniper rifle
            "5bfea6e90db834001b7347f3": 0,	// Remington Model 700 7.62x51 bolt-action sniper rifle
            "5df24cf80dee1b22f862e9bc": 0,	// ORSIS T-5000M 7.62x51 bolt-action sniper rifle /
            // 7.62x54mmR (Mosin/SVD/PKM Soon™)
            "5c46fbd72e2216398b5a8c9c": 0,	// SVDS 7.62x54R sniper rifle
            "5bfd297f0db834001a669119": 15,	// Mosin 7.62x54R bolt-action rifle (Infantry) *
            "5ae08f0a5acfc408fb1398a1": 10,	// Mosin 7.62x54R bolt-action rifle (Sniper) *
            "61f7c9e189e6fb1a5e3ea78d": 60,	// MP-18 7.62x54R single-shot rifle *
            "55801eed4bdc2d89578b4588": 0,	// SV-98 7.62x54R bolt-action sniper rifle
            // .338 Lapua Magnum
            "5fc22d7c187fea44d52eda44": 0,	// SWORD International Mk-18 .338 LM marksman rifle
            "627e14b21713922ded6f2c15": 0,	// Accuracy International AXMC .338 LM bolt-action sniper rifle
            // 9x39mm (VSS/VAL)
            "57838ad32459774a17445cd2": 0,	// VSS Vintorez 9x39 special sniper rifle
            "57c44b372459772d2b39b8ce": 0	// AS VAL 9x39 special assault rifle
        }

        // Normal Scavs Ammo
        db.bots.types.assault.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 99,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 99,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber20g": {					// 20x70mm (Toz)
                "5d6e6a42a4b9364f07165f52": 99,	// 20/70 "Poleva-6u" slug
                "5d6e6a05a4b93618084f58d0": 0,	// 20/70 Star slug
                "5d6e6a53a4b9361bd473feec": 0,	// 20/70 "Poleva-3" slug
                "5d6e6a5fa4b93614ec501745": 0,	// 20/70 Devastator slug
                "5d6e69c7a4b9360b6c0d54e4": 0,	// 20/70 7.3mm buckshot
                "5a38ebd9c4a282000d722a5b": 0,	// 20/70 7.5mm buckshot
                "5d6e69b9a4b9361bc8618958": 0,	// 20/70 6.2mm buckshot
                "5d6e695fa4b936359b35d852": 0	// 20/70 5.6mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 99,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber366TKM": {				// .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Tagged & Cursed Scavs Ammo
        db.bots.types.cursedassault.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 99,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 99,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber20g": {					// 20x70mm (Toz)
                "5d6e6a42a4b9364f07165f52": 99,	// 20/70 "Poleva-6u" slug
                "5d6e6a05a4b93618084f58d0": 0,	// 20/70 Star slug
                "5d6e6a53a4b9361bd473feec": 0,	// 20/70 "Poleva-3" slug
                "5d6e6a5fa4b93614ec501745": 0,	// 20/70 Devastator slug
                "5d6e69c7a4b9360b6c0d54e4": 0,	// 20/70 7.3mm buckshot
                "5a38ebd9c4a282000d722a5b": 0,	// 20/70 7.5mm buckshot
                "5d6e69b9a4b9361bc8618958": 0,	// 20/70 6.2mm buckshot
                "5d6e695fa4b936359b35d852": 0	// 20/70 5.6mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 99,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber366TKM": {				// .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Crazy Scavs Ammo
        db.bots.types.crazyassaultevent.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 99,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 99,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber20g": {					// 20x70mm (Toz)
                "5d6e6a42a4b9364f07165f52": 99,	// 20/70 "Poleva-6u" slug
                "5d6e6a05a4b93618084f58d0": 0,	// 20/70 Star slug
                "5d6e6a53a4b9361bd473feec": 0,	// 20/70 "Poleva-3" slug
                "5d6e6a5fa4b93614ec501745": 0,	// 20/70 Devastator slug
                "5d6e69c7a4b9360b6c0d54e4": 0,	// 20/70 7.3mm buckshot
                "5a38ebd9c4a282000d722a5b": 0,	// 20/70 7.5mm buckshot
                "5d6e69b9a4b9361bc8618958": 0,	// 20/70 6.2mm buckshot
                "5d6e695fa4b936359b35d852": 0	// 20/70 5.6mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 99,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber366TKM": {				// .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Sniper Scavs Ammo
        db.bots.types.marksman.inventory.Ammo = {
            "Caliber366TKM": {				// .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 99,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 1	// 9x39mm SP-5
            }
        }

        // Bloodhounds Ammo
        db.bots.types.arenafighter.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber46x30": {				// 4.6x30mm HK (MP7)
                "5ba26835d4351e0035628ff5": 0,	// 4.6x30mm AP SX
                "5ba2678ad4351e44f824b344": 99,	// 4.6x30mm FMJ SX
                "5ba26844d4351e00334c9475": 0,	// 4.6x30MM Subsonic SX
                "5ba26812d4351e003201fef1": 0	// 4.6x30mm Action SX
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber57x28": {				// 5.7x28mm (P90/FiveSeven)
                "5cc80f38e4a949001152b560": 99,	// 5.7x28mm SS190
                "5cc80f53e4a949000e1ea4f8": 0,	// 5.7x28mm L191
                "5cc80f67e4a949035e43bbba": 0,	// 5.7x28mm SB193
                "5cc80f8fe4a949033b0224a2": 99,	// 5.7x28mm SS197SR
                "5cc80f79e4a949033c7343b2": 0,	// 5.7x28mm SS198LF
                "5cc86840d7f00c002412c56c": 0,	// 5.7x28mm R37.X
                "5cc86832d7f00c000d3a6e6c": 0	// 5.7x28mm R37.F
            },
            "Caliber762x35": {				// .300 Blackout
                "5fd20ff893a8961fc660a954": 0,	// .300 Blackout AP
                "619636be6db0f2477964e710": 99,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 0,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 99,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 0,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 99,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 99,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 1	// 9x39mm SP-5
            }
        }

        // Bloodhounds Ammo (Event)
        db.bots.types.arenafighterevent.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber46x30": {				// 4.6x30mm HK (MP7)
                "5ba26835d4351e0035628ff5": 0,	// 4.6x30mm AP SX
                "5ba2678ad4351e44f824b344": 99,	// 4.6x30mm FMJ SX
                "5ba26844d4351e00334c9475": 0,	// 4.6x30MM Subsonic SX
                "5ba26812d4351e003201fef1": 0	// 4.6x30mm Action SX
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber57x28": {				// 5.7x28mm (P90/FiveSeven)
                "5cc80f38e4a949001152b560": 99,	// 5.7x28mm SS190
                "5cc80f53e4a949000e1ea4f8": 0,	// 5.7x28mm L191
                "5cc80f67e4a949035e43bbba": 0,	// 5.7x28mm SB193
                "5cc80f8fe4a949033b0224a2": 99,	// 5.7x28mm SS197SR
                "5cc80f79e4a949033c7343b2": 0,	// 5.7x28mm SS198LF
                "5cc86840d7f00c002412c56c": 0,	// 5.7x28mm R37.X
                "5cc86832d7f00c000d3a6e6c": 0	// 5.7x28mm R37.F
            },
            "Caliber762x35": {				// .300 Blackout
                "5fd20ff893a8961fc660a954": 0,	// .300 Blackout AP
                "619636be6db0f2477964e710": 99,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 0,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 99,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 0,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 99,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 99,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 1	// 9x39mm SP-5
            }
        }

        ////	BOSS SECTION	////

        // Reshala Ammo
        db.bots.types.bossbully.inventory.Ammo =
        {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Reshala Guard Ammo
        db.bots.types.followerbully.inventory.Ammo = {
            "Caliber366TKM": {				// .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            }
        }

        // Gluhar Ammo
        db.bots.types.bossgluhar.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber127x55": {				// Ash12+Revolver
                "5cadf6eeae921500134b2799": 99,	// 12.7x55mm PS12B
                "5cadf6ddae9215051e1c23b2": 99,	// 12.7x55mm PS12
                "5cadf6e5ae921500113bb973": 0	// 12.7x55mm PS12A
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Gluhar Assault Guard Ammo
        db.bots.types.followergluharassault.inventory.Ammo = {
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 0,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 1	// 9x39mm SP-5
            }
        }

        // Gluhar Scout Guard Ammo
        db.bots.types.followergluharscout.inventory.Ammo = {
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 0,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 99,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 99,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            }
        }

        // Gluhar Security Guard Ammo
        db.bots.types.followergluharsecurity.inventory.Ammo = {
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 0,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 60,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // KILLA Ammo
        db.bots.types.bosskilla.inventory.Ammo = {
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Knight Ammo (Goons)
        db.bots.types.bossknight.inventory.Ammo = {
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Big Pipe Ammo (Goons)
        db.bots.types.followerbigpipe.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber40x46": {				// 40x46mm Grenades
                "5ede47405b097655935d7d16": 99,	// 40x46mm M441 (HE) grenade (short fuse)
                "5ede474b0c226a66f5402622": 99,	// 40x46mm M381 (HE) grenade (short fuse)
                "5f0c892565703e5c461894e9": 99,	// 40x46mm M433 (HEDP) grenade
                "5ede4739e0350d05467f73e8": 0,	// 40x46mm M406 (HE) grenade
                "5ede475b549eed7c6d5c18fb": 0,	// 40x46mm M386 (HE) grenade
                "5ede475339ee016e8c534742": 0	// 40x46mm M576 (MP-APERS) grenade (Buckshot grenade)
            },
            "Caliber762x35": {				// .300 Blackout
                "5fd20ff893a8961fc660a954": 99,	// .300 Blackout AP
                "619636be6db0f2477964e710": 99,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 0,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            }
        }

        // Birdeye Ammo (Goons)
        db.bots.types.followerbirdeye.inventory.Ammo = {
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // Shturman Ammo
        db.bots.types.bosskojaniy.inventory.Ammo = {
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            }
        }

        // Shturman Guard Ammo (Loser Brothers)
        db.bots.types.followerkojaniy.inventory.Ammo = {
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 99,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 0,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 0	// 9x39mm SP-5
            }
        }

        // BossSanitar
        db.bots.types.bosssanitar.inventory.Ammo = {
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 99,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 99,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 99,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 1	// 9x39mm SP-5
            }
        }

        // BossTagilla
        db.bots.types.bosstagilla.inventory.Ammo = {
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 99,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            }
        }

        // BossZryachiy
        db.bots.types.bosszryachiy.inventory.Ammo = {
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber86x70": {				// .338 Lapua Magnum
                "5fc382a9d724d907e2077dab": 99,	// .338 Lapua Magnum AP
                "5fc275cf85fd526b824a571a": 99,	// .338 Lapua Magnum FMJ
                "5fc382c1016cce60e8341b20": 0,	// .338 Lapua Magnum UCW
                "5fc382b6d6fa9c00c571bbc3": 0	// .338 Lapua Magnum TAC-X
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 0,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 99,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 0,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            }
        }

        // ExUsec (Rogues)
        db.bots.types.exusec.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x35": {				// .300 Blackout
                "5fd20ff893a8961fc660a954": 0,	// .300 Blackout AP
                "619636be6db0f2477964e710": 0,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 99,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // FollowerSanitar
        db.bots.types.followersanitar.inventory.Ammo = {
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            }
        }

        // FollowerZryachiy (Island cultists)
        db.bots.types.followerzryachiy.inventory.Ammo = {
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            }
        }

        // SectantPriest (Shrek)
        db.bots.types.sectantpriest.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 99,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 0,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 0,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            }
        }

        // SectantWarrior (Cultists)
        db.bots.types.sectantwarrior.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 99,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 0,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 0,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 0,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 99,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 0	// 9x39mm SP-5
            }
        }

        // Raiders
        db.bots.types.pmcbot.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 99,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 0,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 0,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber46x30": {				// 4.6x30mm HK (MP7)
                "5ba26835d4351e0035628ff5": 99,	// 4.6x30mm AP SX
                "5ba2678ad4351e44f824b344": 99,	// 4.6x30mm FMJ SX
                "5ba26844d4351e00334c9475": 0,	// 4.6x30MM Subsonic SX
                "5ba26812d4351e003201fef1": 0	// 4.6x30mm Action SX
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber57x28": {				// 5.7x28mm (P90/FiveSeven)
                "5cc80f38e4a949001152b560": 99,	// 5.7x28mm SS190
                "5cc80f53e4a949000e1ea4f8": 0,	// 5.7x28mm L191
                "5cc80f67e4a949035e43bbba": 0,	// 5.7x28mm SB193
                "5cc80f8fe4a949033b0224a2": 99,	// 5.7x28mm SS197SR
                "5cc80f79e4a949033c7343b2": 0,	// 5.7x28mm SS198LF
                "5cc86840d7f00c002412c56c": 99,	// 5.7x28mm R37.X
                "5cc86832d7f00c000d3a6e6c": 0	// 5.7x28mm R37.F
            },
            "Caliber762x35": {				// .300 Blackout
                "5fd20ff893a8961fc660a954": 0,	// .300 Blackout AP
                "619636be6db0f2477964e710": 0,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 99,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 0,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 99,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 99,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 99,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 1	// 9x39mm SP-5
            }
        }

        // Bear PMC Armors
        db.bots.types.bear.inventory.equipment.ArmorVest = {
            // Lvl 6 armors
            "5fd4c474dd870108a754b241": 80,	// 5.11 Tactical Hexgrid plate carrier
            "5e4abb5086f77406975c9342": 80,	// LBT-6094A Slick Plate Carrier
            "6038b4ca92ec1c3103795a0d": 60,	// LBT-6094A Slick Plate Carrier (Olive)
            "6038b4b292ec1c3103795a0b": 80,	// LBT-6094A Slick Plate Carrier (Tan)
            "5c0e625a86f7742d77340f62": 60,	// BNTI Zhuk-6a body armor
            "60a283193cb70855c43a381d": 99,	// NFM THOR Integrated Carrier body armor
            "545cdb794bdc2d3a198b456a": 60,	// 6B43 6A Zabralo-Sh body armor
            // Lvl 5 armors
            "63737f448b28897f2802b874": 60,	// Hexatac HPC Plate Carrier (Multicam Black)
            "5f5f41476bdad616ad46d631": 80,	// NPP KlASS Korund-VM body armor
            "5e9dacf986f774054d6b89f4": 99,	// FORT Defender-2 body armor
            "5ca2151486f774244a3b8d30": 80,	// FORT Redut-M body armor
            "5ca21c6986f77479963115a7": 60,	// FORT Redut-T5 body armor
            "5c0e541586f7747fa54205c9": 99,	// 6B13 M modified assault armor (Tan) KILLA armor
            "5b44d0de86f774503d30cba8": 60,	// IOTV Gen4 body armor (high mobility kit)
            "5b44cf1486f77431723e3d05": 60,	// IOTV Gen4 body armor (assault kit)
            "5b44cd8b86f774503d30cba2": 40,	// IOTV Gen4 body armor (full protection)
            "5ab8e79e86f7742d8b372e78": 60,	// BNTI Gzhel-K body armor
            // Lvl 4 armors
            "5c0e655586f774045612eeb2": 0,	// HighCom Trooper TFO body armor (Multicam)
            "609e8540d5c319764c2bc2e9": 0,	// NFM THOR Concealable Reinforced Vest body armor
            "5c0e51be86f774598e797894": 0,	// 6B13 assault armor (Flora)
            "5c0e53c886f7747fa54205c7": 0,	// 6B13 assault armor (Digital Flora)
            "5c0e57ba86f7747fa141986d": 0,	// 6B23-2 body armor (Mountain Flora)
            // Lvl 3 armors
            "5ab8e4ed86f7742d8e50c7fa": 0,	// MF-UNTAR body armor
            "5c0e5edb86f77461f55ed1f7": 0,	// BNTI Zhuk-3 body armor (Press)
            "5c0e5bab86f77461f55ed1f3": 0,	// 6B23-1 body armor (Digital Flora)
            "62a09d79de7ac81993580530": 0,	// DRD body armor
            "5b44d22286f774172b0c9de8": 0,	// BNTI Kirasa-N body armor
            // Lvl 2 armors
            "59e7635f86f7742cbf2c1095": 0,	// BNTI Module-3M body armor
            "5648a7494bdc2d9d488b4583": 0,	// PACA Soft Armor
            "607f20859ee58b18e41ecd90": 0,	// PACA Soft Armor (Rivals Edition)
            "5df8a2ca86f7740bfe6df777": 0	// 6B2 body armor (Flora)
        }
                
        //Bear PMC Rigs
        db.bots.types.bear.inventory.equipment.TacticalVest = {
            // Lvl 6 rigs
            "628cd624459354321c4b7fa2": 99,	// Tasmanian Tiger SK plate carrier (Multicam Black)
            "609e860ebd219504d8507525": 80,	// Crye Precision AVS MBAV (Tagilla Edition)
            // Lvl 5 rigs
            "5b44cad286f77402a54ae7e5": 80,	// 5.11 Tactical TacTec plate carrier
            "5e4ac41886f77406a511c9a8": 99,	// Ars Arma CPC MOD.2 plate carrier
            "628b9c7d45122232a872358f": 80,	// Crye Precision CPC plate carrier (Goons Edition)
            "628b9784bcf6e2659e09b8a2": 80,	// S&S Precision PlateFrame plate carrier (Goons Edition)
            "60a3c68c37ea821725773ef5": 60,	// CQC Osprey MK4A plate carrier (Protection, MTP)
            "628d0618d1ba6e4fa07ce5a4": 80,	// NPP KlASS Bagariy armored rig
            // Lvl 4 rigs
            "61bc85697113f767765c7fe7": 0,	// Eagle Industries MMAC plate carrier (Ranger Green)
            "639343fce101f4caa40a4ef3": 0,	// Shellback Tactical Banshee plate carrier (A-Tacs AU)
            "5d5d87f786f77427997cfaef": 0,	// Ars Arma A18 Skanda plate carrier
            "5c0e746986f7741453628fe5": 60,	// WARTECH TV-110 plate carrier rig
            "61bcc89aef0f505f0c6cd0fc": 0,	// FirstSpear Strandhogg plate carrier rig (Ranger Green)
            "628dc750b910320f4c27a732": 0,	// ECLiPSE RBAV-AF plate carrier (Ranger Green)
            "60a3c70cde5f453f634816a3": 0,	// CQC Osprey MK4A plate carrier (Assault, MTP)
            "5d5d646386f7742797261fd9": 0,	// 6B3TM-01M armored rig
            "5c0e446786f7742013381639": 0,	// 6B5-15 Zh-86 Uley armored rig
            "5ab8dced86f774646209ec87": 0,	// ANA Tactical M2 armored rig
            "5c0e722886f7740458316a57": 0,	// ANA Tactical M1 armored rig
            "544a5caa4bdc2d1a388b4568": 60,	// Crye Precision AVS plate carrier
            // Unarmored rigs
            "5c0e6a1586f77404597b4965": 40,	// Belt-A + Belt-B gear rig
            "5df8a42886f77412640e2e75": 99,	// Velocity Systems MPPV Multi-Purpose Patrol Vest
            "5648a69d4bdc2ded0b8b457b": 99,	// Blackrock chest rig
            "5ab8dab586f77441cd04f2a2": 80,	// WARTECH MK3 TV-104 chest rig
            "592c2d1a86f7746dbe2af32a": 60,	// ANA Tactical Alpha chest rig
            "603648ff5a45383c122086ac": 40,	// Azimut SS "Zhuk" chest harness (Black)
            "63611865ba5b90db0c0399d1": 40,	// Azimut SS "Khamelion" chest harness (Olive)
            "6040dd4ddcf9592f401632d2": 40,	// Azimut SS "Zhuk" chest harness (SURPAT)
            "5e9db13186f7742f845ee9d3": 80,	// LBT-1961A Load Bearing Chest Rig
            "628baf0b967de16aab5a4f36": 60,	// LBT-1961A Load Bearing Chest Rig (Goons Edition)
            "60a6220e953894617404b00a": 60,	// Stich Profi Chest Rig MK2 (Recon, A-TACS FG)
            "60a621c49c197e4e8c4455e6": 60,	// Stich Profi Chest Rig MK2 (Assault, A-TACS FG)
            "5d5d85c586f774279a21cbdb": 60,	// Haley Strategic D3CRX Chest Harness
            "5ca20abf86f77418567a43f2": 60,	// Dynaforce Triton M43-A chest harness
            "5c0e9f2c86f77432297fe0a3": 80,	// BlackHawk! Commando chest harness (Black)
            "5b44c8ea86f7742d1627baf1": 60,	// BlackHawk! Commando chest harness (Desert Tan)
            "5f5f41f56760b4138443b352": 60,	// Direct Action Thunderbolt compact chest rig
            "5fd4c60f875c30179f5d04c2": 99,	// Gear Craft GC-BSS-MK1 chest rig
            "6034cf5fffd42c541047f72e": 0,	// Umka M33-SET1 hunter vest
            "5e4abfed86f77406a2713cf7": 0,	// Splav Tarzan M22 chest rig
            "5929a2a086f7744f4b234d43": 0,	// UMTBS 6sh112 Scout-Sniper
            "59e7643b86f7742cbf2c109a": 40,	// WARTECH TV-109 + TV-106 chest rig
            "6034d0230ca681766b6a0fb5": 40,	// CSA chest rig
            "5d5d8ca986f7742798716522": 40,	// SOE Micro Rig
            "5fd4c4fa16cac650092f6771": 0,	// DIY IDEA chest rig
            "5e4abc1f86f774069619fbaa": 0,	// Spiritus Systems Bank Robber chest rig
            "572b7adb24597762ae139821": 0,	// Scav Vest
            "5fd4c5477a8d854fa0105061": 0	// Security Vest
        }

        // Usec PMC Armors
        db.bots.types.usec.inventory.equipment.ArmorVest = {
            // Lvl 6 armors
            "5fd4c474dd870108a754b241": 80,	// 5.11 Tactical Hexgrid plate carrier
            "5e4abb5086f77406975c9342": 80,	// LBT-6094A Slick Plate Carrier
            "6038b4ca92ec1c3103795a0d": 60,	// LBT-6094A Slick Plate Carrier (Olive)
            "6038b4b292ec1c3103795a0b": 80,	// LBT-6094A Slick Plate Carrier (Tan)
            "5c0e625a86f7742d77340f62": 60,	// BNTI Zhuk-6a body armor
            "60a283193cb70855c43a381d": 99,	// NFM THOR Integrated Carrier body armor
            "545cdb794bdc2d3a198b456a": 60,	// 6B43 6A Zabralo-Sh body armor
            // Lvl 5 armors
            "63737f448b28897f2802b874": 60,	// Hexatac HPC Plate Carrier (Multicam Black)
            "5f5f41476bdad616ad46d631": 80,	// NPP KlASS Korund-VM body armor
            "5e9dacf986f774054d6b89f4": 99,	// FORT Defender-2 body armor
            "5ca2151486f774244a3b8d30": 80,	// FORT Redut-M body armor
            "5ca21c6986f77479963115a7": 60,	// FORT Redut-T5 body armor
            "5c0e541586f7747fa54205c9": 99,	// 6B13 M modified assault armor (Tan) KILLA armor
            "5b44d0de86f774503d30cba8": 60,	// IOTV Gen4 body armor (high mobility kit)
            "5b44cf1486f77431723e3d05": 60,	// IOTV Gen4 body armor (assault kit)
            "5b44cd8b86f774503d30cba2": 40,	// IOTV Gen4 body armor (full protection)
            "5ab8e79e86f7742d8b372e78": 60,	// BNTI Gzhel-K body armor
            // Lvl 4 armors
            "5c0e655586f774045612eeb2": 0,	// HighCom Trooper TFO body armor (Multicam)
            "609e8540d5c319764c2bc2e9": 0,	// NFM THOR Concealable Reinforced Vest body armor
            "5c0e51be86f774598e797894": 0,	// 6B13 assault armor (Flora)
            "5c0e53c886f7747fa54205c7": 0,	// 6B13 assault armor (Digital Flora)
            "5c0e57ba86f7747fa141986d": 0,	// 6B23-2 body armor (Mountain Flora)
            // Lvl 3 armors
            "5ab8e4ed86f7742d8e50c7fa": 0,	// MF-UNTAR body armor
            "5c0e5edb86f77461f55ed1f7": 0,	// BNTI Zhuk-3 body armor (Press)
            "5c0e5bab86f77461f55ed1f3": 0,	// 6B23-1 body armor (Digital Flora)
            "62a09d79de7ac81993580530": 0,	// DRD body armor
            "5b44d22286f774172b0c9de8": 0,	// BNTI Kirasa-N body armor
            // Lvl 2 armors
            "59e7635f86f7742cbf2c1095": 0,	// BNTI Module-3M body armor
            "5648a7494bdc2d9d488b4583": 0,	// PACA Soft Armor
            "607f20859ee58b18e41ecd90": 0,	// PACA Soft Armor (Rivals Edition)
            "5df8a2ca86f7740bfe6df777": 0	// 6B2 body armor (Flora)
        }
        
        //Usec PMC Rigs
        db.bots.types.usec.inventory.equipment.TacticalVest = {
            // Lvl 6 rigs
            "628cd624459354321c4b7fa2": 99,	// Tasmanian Tiger SK plate carrier (Multicam Black)
            "609e860ebd219504d8507525": 80,	// Crye Precision AVS MBAV (Tagilla Edition)
            // Lvl 5 rigs
            "5b44cad286f77402a54ae7e5": 80,	// 5.11 Tactical TacTec plate carrier
            "5e4ac41886f77406a511c9a8": 99,	// Ars Arma CPC MOD.2 plate carrier
            "628b9c7d45122232a872358f": 80,	// Crye Precision CPC plate carrier (Goons Edition)
            "628b9784bcf6e2659e09b8a2": 80,	// S&S Precision PlateFrame plate carrier (Goons Edition)
            "60a3c68c37ea821725773ef5": 60,	// CQC Osprey MK4A plate carrier (Protection, MTP)
            "628d0618d1ba6e4fa07ce5a4": 80,	// NPP KlASS Bagariy armored rig
            // Lvl 4 rigs
            "61bc85697113f767765c7fe7": 0,	// Eagle Industries MMAC plate carrier (Ranger Green)
            "639343fce101f4caa40a4ef3": 0,	// Shellback Tactical Banshee plate carrier (A-Tacs AU)
            "5d5d87f786f77427997cfaef": 0,	// Ars Arma A18 Skanda plate carrier
            "5c0e746986f7741453628fe5": 60,	// WARTECH TV-110 plate carrier rig
            "61bcc89aef0f505f0c6cd0fc": 0,	// FirstSpear Strandhogg plate carrier rig (Ranger Green)
            "628dc750b910320f4c27a732": 0,	// ECLiPSE RBAV-AF plate carrier (Ranger Green)
            "60a3c70cde5f453f634816a3": 0,	// CQC Osprey MK4A plate carrier (Assault, MTP)
            "5d5d646386f7742797261fd9": 0,	// 6B3TM-01M armored rig
            "5c0e446786f7742013381639": 0,	// 6B5-15 Zh-86 Uley armored rig
            "5ab8dced86f774646209ec87": 0,	// ANA Tactical M2 armored rig
            "5c0e722886f7740458316a57": 0,	// ANA Tactical M1 armored rig
            "544a5caa4bdc2d1a388b4568": 60,	// Crye Precision AVS plate carrier
            // Unarmored rigs
            "5c0e6a1586f77404597b4965": 40,	// Belt-A + Belt-B gear rig
            "5df8a42886f77412640e2e75": 99,	// Velocity Systems MPPV Multi-Purpose Patrol Vest
            "5648a69d4bdc2ded0b8b457b": 99,	// Blackrock chest rig
            "5ab8dab586f77441cd04f2a2": 80,	// WARTECH MK3 TV-104 chest rig
            "592c2d1a86f7746dbe2af32a": 60,	// ANA Tactical Alpha chest rig
            "603648ff5a45383c122086ac": 40,	// Azimut SS "Zhuk" chest harness (Black)
            "63611865ba5b90db0c0399d1": 40,	// Azimut SS "Khamelion" chest harness (Olive)
            "6040dd4ddcf9592f401632d2": 40,	// Azimut SS "Zhuk" chest harness (SURPAT)
            "5e9db13186f7742f845ee9d3": 80,	// LBT-1961A Load Bearing Chest Rig
            "628baf0b967de16aab5a4f36": 60,	// LBT-1961A Load Bearing Chest Rig (Goons Edition)
            "60a6220e953894617404b00a": 60,	// Stich Profi Chest Rig MK2 (Recon, A-TACS FG)
            "60a621c49c197e4e8c4455e6": 60,	// Stich Profi Chest Rig MK2 (Assault, A-TACS FG)
            "5d5d85c586f774279a21cbdb": 60,	// Haley Strategic D3CRX Chest Harness
            "5ca20abf86f77418567a43f2": 60,	// Dynaforce Triton M43-A chest harness
            "5c0e9f2c86f77432297fe0a3": 80,	// BlackHawk! Commando chest harness (Black)
            "5b44c8ea86f7742d1627baf1": 60,	// BlackHawk! Commando chest harness (Desert Tan)
            "5f5f41f56760b4138443b352": 60,	// Direct Action Thunderbolt compact chest rig
            "5fd4c60f875c30179f5d04c2": 99,	// Gear Craft GC-BSS-MK1 chest rig
            "6034cf5fffd42c541047f72e": 0,	// Umka M33-SET1 hunter vest
            "5e4abfed86f77406a2713cf7": 0,	// Splav Tarzan M22 chest rig
            "5929a2a086f7744f4b234d43": 0,	// UMTBS 6sh112 Scout-Sniper
            "59e7643b86f7742cbf2c109a": 40,	// WARTECH TV-109 + TV-106 chest rig
            "6034d0230ca681766b6a0fb5": 40,	// CSA chest rig
            "5d5d8ca986f7742798716522": 40,	// SOE Micro Rig
            "5fd4c4fa16cac650092f6771": 0,	// DIY IDEA chest rig
            "5e4abc1f86f774069619fbaa": 0,	// Spiritus Systems Bank Robber chest rig
            "572b7adb24597762ae139821": 0,	// Scav Vest
            "5fd4c5477a8d854fa0105061": 0	// Security Vest
        }

        // Bear PMC Ammo
        db.bots.types.bear.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber127x55": {				// Ash12+Revolver
                "5cadf6eeae921500134b2799": 99,	// 12.7x55mm PS12B
                "5cadf6ddae9215051e1c23b2": 0,	// 12.7x55mm PS12
                "5cadf6e5ae921500113bb973": 0	// 12.7x55mm PS12A
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 99,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber20g": {					// 20x70mm (Toz)
                "5d6e6a42a4b9364f07165f52": 99,	// 20/70 "Poleva-6u" slug
                "5d6e6a05a4b93618084f58d0": 0,	// 20/70 Star slug
                "5d6e6a53a4b9361bd473feec": 0,	// 20/70 "Poleva-3" slug
                "5d6e6a5fa4b93614ec501745": 0,	// 20/70 Devastator slug
                "5d6e69c7a4b9360b6c0d54e4": 0,	// 20/70 7.3mm buckshot
                "5a38ebd9c4a282000d722a5b": 0,	// 20/70 7.5mm buckshot
                "5d6e69b9a4b9361bc8618958": 0,	// 20/70 6.2mm buckshot
                "5d6e695fa4b936359b35d852": 0	// 20/70 5.6mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 99,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber366TKM": {				// .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber40mmRU": {				// Underbarrel AK grenades
                "5656eb674bdc2d35148b457c": 99	// VOG-25 grenade
            },
            "Caliber40x46": {				// 40x46mm Grenades
                "5ede47405b097655935d7d16": 99,	// 40x46mm M441 (HE) grenade (short fuse)
                "5ede474b0c226a66f5402622": 99,	// 40x46mm M381 (HE) grenade (short fuse)
                "5f0c892565703e5c461894e9": 0,	// 40x46mm M433 (HEDP) grenade
                "5ede4739e0350d05467f73e8": 0,	// 40x46mm M406 (HE) grenade
                "5ede475b549eed7c6d5c18fb": 0,	// 40x46mm M386 (HE) grenade
                "5ede475339ee016e8c534742": 0	// 40x46mm M576 (MP-APERS) grenade (Buckshot grenade)
            },
            "Caliber46x30": {					// 4.6x30mm HK (MP7)
                "5ba26835d4351e0035628ff5": 99,	// 4.6x30mm AP SX
                "5ba2678ad4351e44f824b344": 99,	// 4.6x30mm FMJ SX
                "5ba26844d4351e00334c9475": 0,	// 4.6x30MM Subsonic SX
                "5ba26812d4351e003201fef1": 0	// 4.6x30mm Action SX
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 99,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 0,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber57x28": {				// 5.7x28mm (P90/FiveSeven)
                "5cc80f38e4a949001152b560": 99,	// 5.7x28mm SS190
                "5cc80f53e4a949000e1ea4f8": 0,	// 5.7x28mm L191
                "5cc80f67e4a949035e43bbba": 0,	// 5.7x28mm SB193
                "5cc80f8fe4a949033b0224a2": 0,	// 5.7x28mm SS197SR
                "5cc80f79e4a949033c7343b2": 0,	// 5.7x28mm SS198LF
                "5cc86840d7f00c002412c56c": 0,	// 5.7x28mm R37.X
                "5cc86832d7f00c000d3a6e6c": 0	// 5.7x28mm R37.F
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x35": {				// .300 Blackout
                "5fd20ff893a8961fc660a954": 99,	// .300 Blackout AP
                "619636be6db0f2477964e710": 99,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 0,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber86x70": {				// .338 Lapua Magnum
                "5fc382a9d724d907e2077dab": 99,	// .338 Lapua Magnum AP
                "5fc275cf85fd526b824a571a": 99,	// .338 Lapua Magnum FMJ
                "5fc382c1016cce60e8341b20": 0,	// .338 Lapua Magnum UCW
                "5fc382b6d6fa9c00c571bbc3": 0	// .338 Lapua Magnum TAC-X
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 99,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 0,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 0,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            },
            "Caliber9x33R": {				// .357 Magnum
                "62330b3ed4dc74626d570b95": 99,	// .357 Magnum FMJ
                "62330c18744e5e31df12f516": 0,	// .357 Magnum JHP
                "62330bfadc5883093563729b": 0,	// .357 Magnum HP
                "62330c40bdd19b369e1e53d1": 0	// .357 Magnum SP
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 99,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 99,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 0,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 0	// 9x39mm SP-5
            }
        }
        
        // Bear PMC Weapons (Higher values spawn more often, 0 disables the gun from spawning.)
        
        // Main Slot Weapons
        db.bots.types.bear.inventory.equipment.FirstPrimaryWeapon = {
            "5cadfbf7ae92152ac412eeef": 40,	// ASh-12 12.7x55 assault rifle
            // Shotguns
            "6259b864ebedf17603599e88": 60,	// Benelli M3 Super 90 dual-mode 12ga shotgun
            "5e870397991fd70db46995c8": 0,	// Mossberg 590A1 12ga pump-action shotgun
            "5a7828548dc32e5a9c28b516": 0,	// Remington Model 870 12ga pump-action shotgun
            "54491c4f4bdc2db1078b4568": 0,	// MP-133 12ga pump-action shotgun
            "56dee2bdd2720bc8328b4567": 80,	// MP-153 12ga semi-automatic shotgun
            "606dae0ab0e443224b421bb7": 80,	// MP-155 12ga semi-automatic shotgun
            "5580223e4bdc2d1c128b457f": 0,	// MP-43-1C 12ga double-barrel shotgun
            "60db29ce99594040e04c4a27": 0,	// MTs-255-12 12ga shotgun
            "576165642459773c7a400233": 99,	// Saiga 12ga ver.10 12/76 semi-automatic shotgun
            "5a38e6bac4a2826c6e06d79b": 0,	// TOZ-106 20ga bolt-action shotgun
            "5e848cc2988a8701445df1e8": 40,	// TOZ KS-23M 23x75mm pump-action shotgun
            // .366 TKM
            "59e6687d86f77411d949b251": 40,	// Molot VPO-209 .366 TKM carbine
            "5de652c31b7e3716273428be": 0,	// Molot VPO-215 "Gornostay" .366 TKM bolt-action rifle
            //Grenade Launchers
            "5e81ebcd8e146c7080625e15": 20,	// FN40GL Mk2 40mm grenade launcher
            "6275303a9f372d6ea97f9ec7": 20,	// Milkor M32A1 MSGL 40mm grenade launcher
            // 5.45x39mm (smol AK)
            "628b5638ad252a16da6dd245": 60,	// SAG AK-545 5.45x39 carbine
            "628b9c37a733087d0d7fe84b": 0,	// SAG AK-545 Short 5.45x39 carbine
            "5ac66d9b5acfc4001633997a": 80,	// Kalashnikov AK-105 5.45x39 assault rifle
            "5bf3e03b0db834001d2c4a9c": 60,	// Kalashnikov AK-74 5.45x39 assault rifle
            "5ac4cd105acfc40016339859": 80,	// Kalashnikov AK-74M 5.45x39 assault rifle
            "5644bd2b4bdc2d3b4c8b4572": 60,	// Kalashnikov AK-74N 5.45x39 assault rifle
            "5bf3e0490db83400196199af": 60,	// Kalashnikov AKS-74 5.45x39 assault rifle
            "5ab8e9fcd8ce870019439434": 0,	// Kalashnikov AKS-74N 5.45x39 assault rifle
            "57dc2fa62459775949412633": 0,	// Kalashnikov AKS-74U 5.45x39 assault rifle
            "583990e32459771419544dd2": 0,	// Kalashnikov AKS-74UN 5.45x39 assault rifle
            "5839a40f24597726f856b511": 0,	// Kalashnikov AKS-74UB 5.45x39 assault rifle
            "5beed0f50db834001c062b12": 60,	// RPK-16 5.45x39 light machine gun
            // .556/.300 Blackout
            "5c07c60e0db834002330051f": 0,	// ADAR 2-15 5.56x45 carbine
            "5d43021ca4b9362eab4b5e25": 0,	// Lone Star TX-15 DML 5.56x45 carbine
            "5ac66cb05acfc40198510a10": 80,	// Kalashnikov AK-101 5.56x45 assault rifle
            "5ac66d015acfc400180ae6e4": 80,	// Kalashnikov AK-102 5.56x45 assault rifle
            "62e7c4fba689e8c9c50dfc38": 40,	// Steyr AUG A1 5.56x45 assault rifle
            "63171672192e68c5460cebc5": 40,	// Steyr AUG A3 5.56x45 assault rifle
            "5c488a752e221602b412af63": 40,	// Desert Tech MDR 5.56x45 assault rifle
            "5bb2475ed4351e00853264e3": 99,	// HK 416A5 5.56x45 assault rifle
            "623063e994fc3f7b302a9696": 60,	// HK G36 5.56x45 assault rifle
            "5447a9cd4bdc2dbd208b4567": 99,	// M4A1 Assault Rifle
            "6184055050224f204c1da540": 60,	// FN SCAR-L 5.56x45 assault rifle
            "618428466ef05c2ce828f218": 60,	// FN SCAR-L 5.56x45 assault rifle (FDE)
            "5fbcc1d9016cce60e8341ab3": 60,	// SIG MCX .300 Blackout assault rifle
            // PDW,SMG/9mm
            "59f9cabd86f7743a10721f46": 0,	// Saiga-9 9x19 carbine
            "60339954d62c9b14ed777c06": 0,	// Soyuz-TM STM-9 Gen.2 9x19 carbine
            "58948c8e86f77409493f7266": 40,	// SIG MPX 9x19 submachine gun
            "5cc82d76e24e8d00134b4b83": 60,	// FN P90 5.7x28 submachine gun
            "62e14904c2699c0ec93adc47": 40,	// SR-2M "Veresk" 9x21 submachine gun
            "5926bb2186f7744b1c6c6e60": 40,	// HK MP5 9x19 submachine gun (Navy 3 Round Burst)
            "5d2f0d8048f0356c925bc3b0": 0,	// HK MP5K 9x19 submachine gun
            "5ba26383d4351e00334c93d9": 40,	// HK MP7A1 4.6x30 submachine gun
            "5bd70322209c4d00d7167b8f": 60,	// HK MP7A2 4.6x30 submachine gun
            "5e00903ae9dc277128008b87": 0,	// B&T MP9 9x19 submachine gun
            "5de7bd7bfd6b4e6e2276dc25": 20,	// B&T MP9-N 9x19 submachine gun
            "5fc3f2d5900b1d5091531e57": 60,	// TDI KRISS Vector Gen.2 9x19 submachine gun
            "5fb64bc92b1b027b1f50bcf2": 60,	// TDI KRISS Vector Gen.2 .45 ACP submachine gun
            "5fc3e272f8b6a877a729eac5": 40,	// HK UMP .45 ACP submachine gun
            "57d14d2524597714373db789": 30,	// PP-91 "Kedr" 9x18PM submachine gun
            "5ea03f7400685063ec28bfa8": 20,	// PPSh-41 7.62x25 submachine gun
            // 7.62x39mm (Bik AK/SKS)
            "587e02ff24597743df3deaeb": 0,	// Simonov OP-SKS 7.62x39 carbine (Hunting Rifle Version)
            "574d967124597745970e7c94": 20,	// Simonov SKS 7.62x39 carbine
            "59e6152586f77473dc057aa1": 0,	// Molot VPO-136 "Vepr-KM" 7.62x39 carbine
            "5ac66d2e5acfc43b321d4b53": 60,	// Kalashnikov AK-103 7.62x39 assault rifle
            "5ac66d725acfc43b321d4b60": 60,	// Kalashnikov AK-104 7.62x39 assault rifle
            "59d6088586f774275f37482f": 60,	// Kalashnikov AKM 7.62x39 assault rifle
            "5a0ec13bfcdbcb00165aa685": 60,	// Kalashnikov AKMN 7.62x39 assault rifle
            "59ff346386f77477562ff5e2": 60,	// Kalashnikov AKMS 7.62x39 assault rifle
            "5abcbc27d8ce8700182eceeb": 60,	// Kalashnikov AKMSN 7.62x39 assault rifle
            "606587252535c57a13424cfd": 60,	// CMMG Mk47 Mutant 7.62x39 assault rifle
            "628a60ae6b1d481ff772e9c8": 99,	// Rifle Dynamics RD-704 7.62x39 assault rifle
            // 7.62x51mm NATO (Bik AR, three 'o' hate)
            "5f2a9575926fd9352339381f": 40,	// Kel-Tec RFB 7.62x51 rifle
            "5c501a4d2e221602b412b540": 0,	// Molot VPO-101 "Vepr-Hunter" 7.62x51 carbine
            "5dcbd56fdbd3d91b3e5468d5": 60,	// Desert Tech MDR 7.62x51 assault rifle
            "5b0bbe4e5acfc40dc528a72d": 80,	// DS Arms SA-58 7.62x51 assault rifle
            "6183afd850224f204c1da514": 80,	// FN SCAR-H 7.62x51 assault rifle
            "6165ac306ef05c2ce828ef74": 80,	// FN SCAR-H 7.62x51 assault rifle (FDE)
            "6176aca650224f204c1da3fb": 80,	// HK G28 7.62x51 marksman rifle
            "5aafa857e5b5b00018480968": 50,	// Springfield Armory M1A 7.62x51 rifle
            "5a367e5dc4a282000e49738f": 50,	// Remington R11 RSASS 7.62x51 marksman rifle
            "5df8ce05b11454561e39243b": 80,	// Knight's Armament Company SR-25 7.62x51 marksman rifle
            "588892092459774ac91d4b11": 99,	// Lobaev Arms DVL-10 7.62x51 bolt-action sniper rifle
            "5bfea6e90db834001b7347f3": 99,	// Remington Model 700 7.62x51 bolt-action sniper rifle
            "5df24cf80dee1b22f862e9bc": 99,	// ORSIS T-5000M 7.62x51 bolt-action sniper rifle /
            // 7.62x54mmR (Mosin/SVD/PKM Soon™)
            "5c46fbd72e2216398b5a8c9c": 99,	// SVDS 7.62x54R sniper rifle
            "5bfd297f0db834001a669119": 0,	// Mosin 7.62x54R bolt-action rifle (Infantry)
            "5ae08f0a5acfc408fb1398a1": 0,	// Mosin 7.62x54R bolt-action rifle (Sniper)
            "61f7c9e189e6fb1a5e3ea78d": 0,	// MP-18 7.62x54R single-shot rifle
            "55801eed4bdc2d89578b4588": 20,	// SV-98 7.62x54R bolt-action sniper rifle
            // .338 Lapua Magnum
            "5fc22d7c187fea44d52eda44": 20,	// SWORD International Mk-18 .338 LM marksman rifle
            "627e14b21713922ded6f2c15": 20,	// Accuracy International AXMC .338 LM bolt-action sniper rifle
            // 9x39mm (VSS/VAL)
            "57838ad32459774a17445cd2": 20,	// VSS Vintorez 9x39 special sniper rifle
            "57c44b372459772d2b39b8ce": 60	// AS VAL 9x39 special assault rifle
        }

        // Secondary Slot Weapon (5% bonus gun)
        db.bots.types.bear.inventory.equipment.SecondPrimaryWeapon = {
            "5cadfbf7ae92152ac412eeef": 40,	// ASh-12 12.7x55 assault rifle
            // Shotguns
            "6259b864ebedf17603599e88": 60,	// Benelli M3 Super 90 dual-mode 12ga shotgun
            "5e870397991fd70db46995c8": 0,	// Mossberg 590A1 12ga pump-action shotgun
            "5a7828548dc32e5a9c28b516": 0,	// Remington Model 870 12ga pump-action shotgun
            "54491c4f4bdc2db1078b4568": 0,	// MP-133 12ga pump-action shotgun
            "56dee2bdd2720bc8328b4567": 80,	// MP-153 12ga semi-automatic shotgun
            "606dae0ab0e443224b421bb7": 80,	// MP-155 12ga semi-automatic shotgun
            "5580223e4bdc2d1c128b457f": 0,	// MP-43-1C 12ga double-barrel shotgun
            "60db29ce99594040e04c4a27": 0,	// MTs-255-12 12ga shotgun
            "576165642459773c7a400233": 99,	// Saiga 12ga ver.10 12/76 semi-automatic shotgun
            "5a38e6bac4a2826c6e06d79b": 0,	// TOZ-106 20ga bolt-action shotgun
            "5e848cc2988a8701445df1e8": 40,	// TOZ KS-23M 23x75mm pump-action shotgun
            // .366 TKM
            "59e6687d86f77411d949b251": 40,	// Molot VPO-209 .366 TKM carbine
            "5de652c31b7e3716273428be": 0,	// Molot VPO-215 "Gornostay" .366 TKM bolt-action rifle
            //Grenade Launchers
            "5e81ebcd8e146c7080625e15": 20,	// FN40GL Mk2 40mm grenade launcher
            "6275303a9f372d6ea97f9ec7": 20,	// Milkor M32A1 MSGL 40mm grenade launcher
            // 5.45x39mm (smol AK)
            "628b5638ad252a16da6dd245": 60,	// SAG AK-545 5.45x39 carbine
            "628b9c37a733087d0d7fe84b": 0,	// SAG AK-545 Short 5.45x39 carbine
            "5ac66d9b5acfc4001633997a": 80,	// Kalashnikov AK-105 5.45x39 assault rifle
            "5bf3e03b0db834001d2c4a9c": 60,	// Kalashnikov AK-74 5.45x39 assault rifle
            "5ac4cd105acfc40016339859": 80,	// Kalashnikov AK-74M 5.45x39 assault rifle
            "5644bd2b4bdc2d3b4c8b4572": 60,	// Kalashnikov AK-74N 5.45x39 assault rifle
            "5bf3e0490db83400196199af": 60,	// Kalashnikov AKS-74 5.45x39 assault rifle
            "5ab8e9fcd8ce870019439434": 0,	// Kalashnikov AKS-74N 5.45x39 assault rifle
            "57dc2fa62459775949412633": 0,	// Kalashnikov AKS-74U 5.45x39 assault rifle
            "583990e32459771419544dd2": 0,	// Kalashnikov AKS-74UN 5.45x39 assault rifle
            "5839a40f24597726f856b511": 0,	// Kalashnikov AKS-74UB 5.45x39 assault rifle
            "5beed0f50db834001c062b12": 60,	// RPK-16 5.45x39 light machine gun
            // .556/.300 Blackout
            "5c07c60e0db834002330051f": 0,	// ADAR 2-15 5.56x45 carbine
            "5d43021ca4b9362eab4b5e25": 0,	// Lone Star TX-15 DML 5.56x45 carbine
            "5ac66cb05acfc40198510a10": 80,	// Kalashnikov AK-101 5.56x45 assault rifle
            "5ac66d015acfc400180ae6e4": 80,	// Kalashnikov AK-102 5.56x45 assault rifle
            "62e7c4fba689e8c9c50dfc38": 40,	// Steyr AUG A1 5.56x45 assault rifle
            "63171672192e68c5460cebc5": 40,	// Steyr AUG A3 5.56x45 assault rifle
            "5c488a752e221602b412af63": 40,	// Desert Tech MDR 5.56x45 assault rifle
            "5bb2475ed4351e00853264e3": 99,	// HK 416A5 5.56x45 assault rifle
            "623063e994fc3f7b302a9696": 60,	// HK G36 5.56x45 assault rifle
            "5447a9cd4bdc2dbd208b4567": 99,	// M4A1 Assault Rifle
            "6184055050224f204c1da540": 60,	// FN SCAR-L 5.56x45 assault rifle
            "618428466ef05c2ce828f218": 60,	// FN SCAR-L 5.56x45 assault rifle (FDE)
            "5fbcc1d9016cce60e8341ab3": 60,	// SIG MCX .300 Blackout assault rifle
            // PDW,SMG/9mm
            "59f9cabd86f7743a10721f46": 0,	// Saiga-9 9x19 carbine
            "60339954d62c9b14ed777c06": 0,	// Soyuz-TM STM-9 Gen.2 9x19 carbine
            "58948c8e86f77409493f7266": 40,	// SIG MPX 9x19 submachine gun
            "5cc82d76e24e8d00134b4b83": 60,	// FN P90 5.7x28 submachine gun
            "62e14904c2699c0ec93adc47": 40,	// SR-2M "Veresk" 9x21 submachine gun
            "5926bb2186f7744b1c6c6e60": 40,	// HK MP5 9x19 submachine gun (Navy 3 Round Burst)
            "5d2f0d8048f0356c925bc3b0": 0,	// HK MP5K 9x19 submachine gun
            "5ba26383d4351e00334c93d9": 40,	// HK MP7A1 4.6x30 submachine gun
            "5bd70322209c4d00d7167b8f": 60,	// HK MP7A2 4.6x30 submachine gun
            "5e00903ae9dc277128008b87": 0,	// B&T MP9 9x19 submachine gun
            "5de7bd7bfd6b4e6e2276dc25": 20,	// B&T MP9-N 9x19 submachine gun
            "5fc3f2d5900b1d5091531e57": 60,	// TDI KRISS Vector Gen.2 9x19 submachine gun
            "5fb64bc92b1b027b1f50bcf2": 60,	// TDI KRISS Vector Gen.2 .45 ACP submachine gun
            "5fc3e272f8b6a877a729eac5": 40,	// HK UMP .45 ACP submachine gun
            "57d14d2524597714373db789": 30,	// PP-91 "Kedr" 9x18PM submachine gun
            "5ea03f7400685063ec28bfa8": 20,	// PPSh-41 7.62x25 submachine gun
            // 7.62x39mm (Bik AK/SKS)
            "587e02ff24597743df3deaeb": 0,	// Simonov OP-SKS 7.62x39 carbine (Hunting Rifle Version)
            "574d967124597745970e7c94": 20,	// Simonov SKS 7.62x39 carbine
            "59e6152586f77473dc057aa1": 0,	// Molot VPO-136 "Vepr-KM" 7.62x39 carbine
            "5ac66d2e5acfc43b321d4b53": 60,	// Kalashnikov AK-103 7.62x39 assault rifle
            "5ac66d725acfc43b321d4b60": 60,	// Kalashnikov AK-104 7.62x39 assault rifle
            "59d6088586f774275f37482f": 60,	// Kalashnikov AKM 7.62x39 assault rifle
            "5a0ec13bfcdbcb00165aa685": 60,	// Kalashnikov AKMN 7.62x39 assault rifle
            "59ff346386f77477562ff5e2": 60,	// Kalashnikov AKMS 7.62x39 assault rifle
            "5abcbc27d8ce8700182eceeb": 60,	// Kalashnikov AKMSN 7.62x39 assault rifle
            "606587252535c57a13424cfd": 60,	// CMMG Mk47 Mutant 7.62x39 assault rifle
            "628a60ae6b1d481ff772e9c8": 99,	// Rifle Dynamics RD-704 7.62x39 assault rifle
            // 7.62x51mm NATO (Bik AR, three 'o' hate)
            "5f2a9575926fd9352339381f": 40,	// Kel-Tec RFB 7.62x51 rifle
            "5c501a4d2e221602b412b540": 0,	// Molot VPO-101 "Vepr-Hunter" 7.62x51 carbine
            "5dcbd56fdbd3d91b3e5468d5": 60,	// Desert Tech MDR 7.62x51 assault rifle
            "5b0bbe4e5acfc40dc528a72d": 80,	// DS Arms SA-58 7.62x51 assault rifle
            "6183afd850224f204c1da514": 80,	// FN SCAR-H 7.62x51 assault rifle
            "6165ac306ef05c2ce828ef74": 80,	// FN SCAR-H 7.62x51 assault rifle (FDE)
            "6176aca650224f204c1da3fb": 80,	// HK G28 7.62x51 marksman rifle
            "5aafa857e5b5b00018480968": 50,	// Springfield Armory M1A 7.62x51 rifle
            "5a367e5dc4a282000e49738f": 50,	// Remington R11 RSASS 7.62x51 marksman rifle
            "5df8ce05b11454561e39243b": 80,	// Knight's Armament Company SR-25 7.62x51 marksman rifle
            "588892092459774ac91d4b11": 99,	// Lobaev Arms DVL-10 7.62x51 bolt-action sniper rifle
            "5bfea6e90db834001b7347f3": 99,	// Remington Model 700 7.62x51 bolt-action sniper rifle
            "5df24cf80dee1b22f862e9bc": 99,	// ORSIS T-5000M 7.62x51 bolt-action sniper rifle /
            // 7.62x54mmR (Mosin/SVD/PKM Soon™)
            "5c46fbd72e2216398b5a8c9c": 99,	// SVDS 7.62x54R sniper rifle
            "5bfd297f0db834001a669119": 0,	// Mosin 7.62x54R bolt-action rifle (Infantry)
            "5ae08f0a5acfc408fb1398a1": 0,	// Mosin 7.62x54R bolt-action rifle (Sniper)
            "61f7c9e189e6fb1a5e3ea78d": 0,	// MP-18 7.62x54R single-shot rifle
            "55801eed4bdc2d89578b4588": 20,	// SV-98 7.62x54R bolt-action sniper rifle
            // .338 Lapua Magnum
            "5fc22d7c187fea44d52eda44": 20,	// SWORD International Mk-18 .338 LM marksman rifle
            "627e14b21713922ded6f2c15": 20,	// Accuracy International AXMC .338 LM bolt-action sniper rifle
            // 9x39mm (VSS/VAL)
            "57838ad32459774a17445cd2": 20,	// VSS Vintorez 9x39 special sniper rifle
            "57c44b372459772d2b39b8ce": 60	// AS VAL 9x39 special assault rifle
        }
            
        // Usec PMC Ammo
        db.bots.types.usec.inventory.Ammo = {
            "Caliber1143x23ACP": {			// .45 ACP (TWO WORLD WARS!)
                "5efb0cabfb3e451d70735af5": 99,	// .45 ACP AP
                "5e81f423763d9f754677bf2e": 0,	// .45 ACP Match FMJ
                "5efb0d4f4bc50b58e81710f3": 0,	// .45 ACP Lasermatch FMJ
                "5efb0fc6aeb21837e749c801": 0,	// .45 ACP Hydra-Shok
                "5ea2a8e200685063ec28c05a": 99	// .45 ACP RIP
            },
            "Caliber127x55": {				// Ash12+Revolver
                "5cadf6eeae921500134b2799": 99,	// 12.7x55mm PS12B
                "5cadf6ddae9215051e1c23b2": 0,	// 12.7x55mm PS12
                "5cadf6e5ae921500113bb973": 0	// 12.7x55mm PS12A
            },
            "Caliber12g": {					// 12gauge shotguns
                "5d6e68a8a4b9360b6c0d54e2": 99,	// 12/70 AP-20 armor-piercing slug
                "5d6e6911a4b9361bd5780d52": 99,	// 12/70 flechette
                "5d6e68c4a4b9361b93413f79": 0,	// 12/70 makeshift .50 BMG slug
                "5d6e689ca4b9361bc8618956": 0,	// 12/70 "Poleva-6u" slug
                "5d6e68e6a4b9361c140bcfe0": 0,	// 12/70 FTX Custom Lite slug
                "5d6e6891a4b9361bd473feea": 0,	// 12/70 "Poleva-3" slug
                "5d6e68dea4b9361bcc29e659": 0,	// 12/70 Dual Sabot slug
                "58820d1224597753c90aeb13": 0,	// 12/70 lead slug
                "5d6e68b3a4b9361bca7e50b5": 0,	// 12/70 Copper Sabot Premier HP slug
                "5d6e6869a4b9361c140bcfde": 0,	// 12/70 Grizzly 40 slug
                "5d6e68d1a4b93622fe60e845": 0,	// 12/70 SuperFormance HP slug
                "5c0d591486f7744c505b416f": 99,	// 12/70 RIP
                "5d6e6806a4b936088465b17e": 99,	// 12/70 8.5mm Magnum buckshot
                "560d5e524bdc2d25448b4571": 0,	// 12/70 7mm buckshot
                "5d6e67fba4b9361bc73bc779": 0,	// 12/70 6.5mm Express buckshot
                "5d6e6772a4b936088465b17c": 0	// 12/70 5.25mm buckshot
            },
            "Caliber20g": {					// 20x70mm (Toz)
                "5d6e6a42a4b9364f07165f52": 99,	// 20/70 "Poleva-6u" slug
                "5d6e6a05a4b93618084f58d0": 0,	// 20/70 Star slug
                "5d6e6a53a4b9361bd473feec": 0,	// 20/70 "Poleva-3" slug
                "5d6e6a5fa4b93614ec501745": 0,	// 20/70 Devastator slug
                "5d6e69c7a4b9360b6c0d54e4": 0,	// 20/70 7.3mm buckshot
                "5a38ebd9c4a282000d722a5b": 0,	// 20/70 7.5mm buckshot
                "5d6e69b9a4b9361bc8618958": 0,	// 20/70 6.2mm buckshot
                "5d6e695fa4b936359b35d852": 0	// 20/70 5.6mm buckshot
            },
            "Caliber23x75": {				// 23x75mm (KS23)
                "5e85aa1a988a8701445df1f5": 99,	// 23x75mm "Barrikada" slug
                "5e85a9a6eacf8c039e4e2ac1": 99,	// 23x75mm "Shrapnel-10" buckshot
                "5f647f31b6238e5dd066e196": 99,	// 23x75mm "Shrapnel-25" buckshot
                "5e85a9f4add9fe03027d9bf1": 20	// 23x75mm "Zvezda" flashbang round
            },
            "Caliber366TKM": {			        // .366 TKM
                "5f0596629e22f464da6bbdd9": 99,	// .366 TKM AP-M
                "59e655cb86f77411dc52a77b": 0,	// .366 TKM EKO
                "59e6542b86f77411dc52a77a": 0,	// .366 TKM FMJ
                "59e6658b86f77411d949b250": 0	// .366 TKM Geksa
            },
            "Caliber40mmRU": {				// Underbarrel AK grenades
                "5656eb674bdc2d35148b457c": 99	// VOG-25 grenade
            },
            "Caliber40x46": {				// 40x46mm Grenades
                "5ede47405b097655935d7d16": 99,	// 40x46mm M441 (HE) grenade (short fuse)
                "5ede474b0c226a66f5402622": 99,	// 40x46mm M381 (HE) grenade (short fuse)
                "5f0c892565703e5c461894e9": 0,	// 40x46mm M433 (HEDP) grenade
                "5ede4739e0350d05467f73e8": 0,	// 40x46mm M406 (HE) grenade
                "5ede475b549eed7c6d5c18fb": 0,	// 40x46mm M386 (HE) grenade
                "5ede475339ee016e8c534742": 0	// 40x46mm M576 (MP-APERS) grenade (Buckshot grenade)
            },
            "Caliber46x30": {				// 4.6x30mm HK (MP7)
                "5ba26835d4351e0035628ff5": 99,	// 4.6x30mm AP SX
                "5ba2678ad4351e44f824b344": 99,	// 4.6x30mm FMJ SX
                "5ba26844d4351e00334c9475": 0,	// 4.6x30MM Subsonic SX
                "5ba26812d4351e003201fef1": 0	// 4.6x30mm Action SX
            },
            "Caliber545x39": {				// 5.45x39mm (smol AK)
                "5c0d5e4486f77478390952fe": 99,	// 5.45x39mm PPBS gs "Igolnik"
                "56dff026d2720bb8668b4567": 99,	// 5.45x39mm BS gs
                "61962b617c6c7b169525f168": 99,	// 5.45x39mm 7N40
                "56dff061d2720bb5668b4567": 40,	// 5.45x39mm BT gs
                "56dfef82d2720bbd668b4567": 40,	// 5.45x39mm BP gs
                "56dff2ced2720bb4668b4567": 0,	// 5.45x39mm PP gs
                "56dff3afd2720bba668b4567": 0,	// 5.45x39mm PS gs
                "56dff0bed2720bb0668b4567": 0,	// 5.45x39mm FMJ
                "56dff4a2d2720bbd668b456a": 0,	// 5.45x39mm T gs
                "56dff4ecd2720b5f5a8b4568": 0,	// 5.45x39mm US gs
                "56dff421d2720b5f5a8b4567": 0,	// 5.45x39mm SP
                "56dff216d2720bbd668b4568": 0,	// 5.45x39mm HP
                "56dff338d2720bbd668b4569": 0	// 5.45x39mm PRS gs
            },
            "Caliber556x45NATO": {			// 5.56x45mm NATO (smol AR)
                "601949593ae8f707c4608daa": 99,	// 5.56x45mm SSA AP
                "59e690b686f7746c9f75e848": 99,	// 5.56x45mm M995
                "54527ac44bdc2d36668b4567": 99,	// 5.56x45mm M855A1
                "59e6906286f7746c9f75e847": 0,	// 5.56x45mm M856A1
                "54527a984bdc2d4e668b4567": 0,	// 5.56x45mm M855
                "59e6920f86f77411d82aa167": 0,	// 5.56x45mm FMJ
                "59e68f6f86f7746c9f75e846": 0,	// 5.56x45mm M856
                "60194943740c5d77f6705eea": 0,	// 5.56x45mm MK 318 Mod 0 (SOST)
                "59e6918f86f7746c9f75e849": 0,	// 5.56x45mm MK 255 Mod 0 (RRLP)
                "59e6927d86f77411da468256": 0,	// 5.56x45mm HP
                "5c0d5ae286f7741e46554302": 1	// 5.56x45mm Warmageddon
            },
            "Caliber57x28": {				// 5.7x28mm (P90/FiveSeven)
                "5cc80f38e4a949001152b560": 99,	// 5.7x28mm SS190
                "5cc80f53e4a949000e1ea4f8": 0,	// 5.7x28mm L191
                "5cc80f67e4a949035e43bbba": 0,	// 5.7x28mm SB193
                "5cc80f8fe4a949033b0224a2": 0,	// 5.7x28mm SS197SR
                "5cc80f79e4a949033c7343b2": 0,	// 5.7x28mm SS198LF
                "5cc86840d7f00c002412c56c": 0,	// 5.7x28mm R37.X
                "5cc86832d7f00c000d3a6e6c": 0	// 5.7x28mm R37.F
            },
            "Caliber762x25TT": {			// 7.62x25mm Tokarev
                "573603562459776430731618": 99,	// 7.62x25mm TT Pst gzh
                "573603c924597764442bd9cb": 0,	// 7.62x25mm TT PT gzh
                "5736026a245977644601dc61": 0,	// 7.62x25mm TT P gl
                "5735fdcd2459776445391d61": 0,	// 7.62x25mm TT AKBS
                "5735ff5c245977640e39ba7e": 0,	// 7.62x25mm TT FMJ43
                "573601b42459776410737435": 0,	// 7.62x25mm TT LRN
                "573602322459776445391df1": 1	// 7.62x25mm TT LRNPC
            },
            "Caliber762x35": {			// .300 Blackout
                "5fd20ff893a8961fc660a954": 99,	// .300 Blackout AP
                "619636be6db0f2477964e710": 0,	// .300 Blackout M62 Tracer
                "5fbe3ffdf8b6a877a729ea82": 0,	// .300 Blackout BCP FMJ
                "6196364158ef8c428c287d9f": 0,	// .300 Blackout V-Max
                "6196365d58ef8c428c287da1": 0	// .300 Whisper
            },
            "Caliber762x39": {				// 7.62x39mm (Bik AK/SKS)
                "601aa3d2b2bcb34913271e6d": 99,	// 7.62x39mm MAI AP
                "59e0d99486f7744a32234762": 99,	// 7.62x39mm BP gzh
                "5656d7c34bdc2d9d198b4587": 0,	// 7.62x39mm PS gzh
                "59e4cf5286f7741778269d8a": 0,	// 7.62x39mm T-45M1 gzh
                "59e4d24686f7741776641ac7": 0,	// 7.62x39mm US gzh
                "59e4d3d286f774176a36250a": 0	// 7.62x39mm HP
            },
            "Caliber762x51": {				// 7.62x51mm NATO (Bik AR, three 'o' hate)
                "5efb0c1bd79ff02a1f5e68d9": 99,	// 7.62x51mm M993
                "5a6086ea4f39f99cd479502f": 99,	// 7.62x51mm M61
                "5a608bf24f39f98ffc77720e": 99,	// 7.62x51mm M62 Tracer
                "58dd3ad986f77403051cba8f": 60,	// 7.62x51mm M80
                "5e023e53d4353e3302577c4c": 0,	// 7.62x51mm BCP FMJ
                "5e023e6e34d52a55c3304f71": 0,	// 7.62x51mm TCW SP
                "5e023e88277cce2b522ff2b1": 0	// 7.62x51mm Ultra Nosler
            },
            "Caliber762x54R": {				// 7.62x54mmR (Mosin/SVD/PKM Soon™)
                "5e023d48186a883be655e551": 99,	// 7.62x54mm R BS gs
                "560d61e84bdc2da74d8b4571": 99,	// 7.62x54mm R SNB gzh
                "5e023d34e8a400319a28ed44": 99,	// 7.62x54mm R BT gzh
                "59e77a2386f7742ee578960a": 99,	// 7.62x54mm R PS gzh 7N1
                "5887431f2459777e1612938f": 0,	// 7.62x54mm R LPS gzh
                "5e023cf8186a883be655e54f": 0	// 7.62x54mm R T-46M gzh
            },
            "Caliber86x70": {				// .338 Lapua Magnum
                "5fc382a9d724d907e2077dab": 99,	// .338 Lapua Magnum AP
                "5fc275cf85fd526b824a571a": 99,	// .338 Lapua Magnum FMJ
                "5fc382c1016cce60e8341b20": 0,	// .338 Lapua Magnum UCW
                "5fc382b6d6fa9c00c571bbc3": 0	// .338 Lapua Magnum TAC-X
            },
            "Caliber9x18PM": {				// 9x18mm Makarov (Kedr)
                "573719df2459775a626ccbc2": 99,	// 9x18mm PM PBM gzh
                "57371aab2459775a77142f22": 0,	// 9x18mm PMM PstM gzh
                "573718ba2459775a75491131": 0,	// 9x18mm PM BZhT gzh
                "573720e02459776143012541": 0,	// 9x18mm PM RG028 gzh
                "5737201124597760fc4431f1": 0,	// 9x18mm PM Pst gzh
                "57371e4124597760ff7b25f1": 0,	// 9x18mm PM PPT gzh
                "57371b192459775a9f58a5e0": 0,	// 9x18mm PM PPe gzh
                "57371eb62459776125652ac1": 0,	// 9x18mm PM PRS gs
                "57371f2b24597761224311f1": 0,	// 9x18mm PM PS gs PPO
                "573719762459775a626ccbc1": 0,	// 9x18mm PM P gzh
                "57371f8d24597761006c6a81": 0,	// 9x18mm PM PSO gzh
                "5737207f24597760ff7b25f2": 0,	// 9x18mm PM PSV
                "57372140245977611f70ee91": 99,	// 9x18mm PM SP7 gzh
                "5737218f245977612125ba51": 0	// 9x18mm PM SP8 gzh
            },
            "Caliber9x19PARA": {			// 9x19mm Parabellum
                "5efb0da7a29a85116f6ea05f": 99,	// 9x19mm PBP gzh
                "5c925fa22e221601da359b7b": 99,	// 9x19mm AP 6.3
                "56d59d3ad2720bdb418b4577": 0,	// 9x19mm Pst gzh
                "5c3df7d588a4501f290594e5": 0,	// 9x19mm Green Tracer
                "5a3c16fe86f77452b62de32a": 0,	// 9x19mm Luger CCI
                "58864a4f2459770fcc257101": 0,	// 9x19mm PSO gzh
                "5efb0e16aeb21837e749c7ff": 0,	// 9x19mm QuakeMaker
                "5c0d56a986f774449d5de529": 1	// 9x19mm RIP
            },
            "Caliber9x21": {				// 9x21mm Gyurza (Shrimp)
                "5a26ac0ec4a28200741e1e18": 99,	// 9x21mm BT gzh
                "5a269f97c4a282000b151807": 0,	// 9x21mm PS gzh
                "5a26abfac4a28232980eabff": 0,	// 9x21mm P gzh
                "5a26ac06c4a282000c5a90a8": 0	// 9x21mm PE gzh
            },
            "Caliber9x33R": {				// .357 Magnum
                "62330b3ed4dc74626d570b95": 99,	// .357 Magnum FMJ
                "62330c18744e5e31df12f516": 0,	// .357 Magnum JHP
                "62330bfadc5883093563729b": 0,	// .357 Magnum HP
                "62330c40bdd19b369e1e53d1": 0	// .357 Magnum SP
            },
            "Caliber9x39": {				// 9x39mm (VSS/VAL)
                "5c0d688c86f77413ae3407b2": 99,	// 9x39mm BP gs
                "61962d879bb3d20b0946d385": 99,	// 9x39mm PAB-9 gs
                "57a0e5022459774d1673f889": 0,	// 9x39mm SP-6
                "5c0d668f86f7747ccb7f13b2": 0,	// 9x39mm SPP gs
                "57a0dfb82459774d3078b56c": 0	// 9x39mm SP-5
            }
        }
        
        // Usec PMC Weapons (Higher values spawn more often, 0 disables the gun from spawning.)
        
        // Main Slot Weapons
        db.bots.types.usec.inventory.equipment.FirstPrimaryWeapon = {
            "5cadfbf7ae92152ac412eeef": 40,	// ASh-12 12.7x55 assault rifle
            // Shotguns
            "6259b864ebedf17603599e88": 60,	// Benelli M3 Super 90 dual-mode 12ga shotgun
            "5e870397991fd70db46995c8": 0,	// Mossberg 590A1 12ga pump-action shotgun
            "5a7828548dc32e5a9c28b516": 0,	// Remington Model 870 12ga pump-action shotgun
            "54491c4f4bdc2db1078b4568": 0,	// MP-133 12ga pump-action shotgun
            "56dee2bdd2720bc8328b4567": 80,	// MP-153 12ga semi-automatic shotgun
            "606dae0ab0e443224b421bb7": 80,	// MP-155 12ga semi-automatic shotgun
            "5580223e4bdc2d1c128b457f": 0,	// MP-43-1C 12ga double-barrel shotgun
            "60db29ce99594040e04c4a27": 0,	// MTs-255-12 12ga shotgun
            "576165642459773c7a400233": 99,	// Saiga 12ga ver.10 12/76 semi-automatic shotgun
            "5a38e6bac4a2826c6e06d79b": 0,	// TOZ-106 20ga bolt-action shotgun
            "5e848cc2988a8701445df1e8": 40,	// TOZ KS-23M 23x75mm pump-action shotgun
            // .366 TKM
            "59e6687d86f77411d949b251": 40,	// Molot VPO-209 .366 TKM carbine
            "5de652c31b7e3716273428be": 0,	// Molot VPO-215 "Gornostay" .366 TKM bolt-action rifle
            //Grenade Launchers
            "5e81ebcd8e146c7080625e15": 20,	// FN40GL Mk2 40mm grenade launcher
            "6275303a9f372d6ea97f9ec7": 20,	// Milkor M32A1 MSGL 40mm grenade launcher
            // 5.45x39mm (smol AK)
            "628b5638ad252a16da6dd245": 60,	// SAG AK-545 5.45x39 carbine
            "628b9c37a733087d0d7fe84b": 0,	// SAG AK-545 Short 5.45x39 carbine
            "5ac66d9b5acfc4001633997a": 80,	// Kalashnikov AK-105 5.45x39 assault rifle
            "5bf3e03b0db834001d2c4a9c": 60,	// Kalashnikov AK-74 5.45x39 assault rifle
            "5ac4cd105acfc40016339859": 80,	// Kalashnikov AK-74M 5.45x39 assault rifle
            "5644bd2b4bdc2d3b4c8b4572": 60,	// Kalashnikov AK-74N 5.45x39 assault rifle
            "5bf3e0490db83400196199af": 60,	// Kalashnikov AKS-74 5.45x39 assault rifle
            "5ab8e9fcd8ce870019439434": 0,	// Kalashnikov AKS-74N 5.45x39 assault rifle
            "57dc2fa62459775949412633": 0,	// Kalashnikov AKS-74U 5.45x39 assault rifle
            "583990e32459771419544dd2": 0,	// Kalashnikov AKS-74UN 5.45x39 assault rifle
            "5839a40f24597726f856b511": 0,	// Kalashnikov AKS-74UB 5.45x39 assault rifle
            "5beed0f50db834001c062b12": 60,	// RPK-16 5.45x39 light machine gun
            // .556/.300 Blackout
            "5c07c60e0db834002330051f": 0,	// ADAR 2-15 5.56x45 carbine
            "5d43021ca4b9362eab4b5e25": 0,	// Lone Star TX-15 DML 5.56x45 carbine
            "5ac66cb05acfc40198510a10": 80,	// Kalashnikov AK-101 5.56x45 assault rifle
            "5ac66d015acfc400180ae6e4": 80,	// Kalashnikov AK-102 5.56x45 assault rifle
            "62e7c4fba689e8c9c50dfc38": 40,	// Steyr AUG A1 5.56x45 assault rifle
            "63171672192e68c5460cebc5": 40,	// Steyr AUG A3 5.56x45 assault rifle
            "5c488a752e221602b412af63": 40,	// Desert Tech MDR 5.56x45 assault rifle
            "5bb2475ed4351e00853264e3": 99,	// HK 416A5 5.56x45 assault rifle
            "623063e994fc3f7b302a9696": 60,	// HK G36 5.56x45 assault rifle
            "5447a9cd4bdc2dbd208b4567": 99,	// M4A1 Assault Rifle
            "6184055050224f204c1da540": 60,	// FN SCAR-L 5.56x45 assault rifle
            "618428466ef05c2ce828f218": 60,	// FN SCAR-L 5.56x45 assault rifle (FDE)
            "5fbcc1d9016cce60e8341ab3": 60,	// SIG MCX .300 Blackout assault rifle
            // PDW,SMG/9mm
            "59f9cabd86f7743a10721f46": 0,	// Saiga-9 9x19 carbine
            "60339954d62c9b14ed777c06": 0,	// Soyuz-TM STM-9 Gen.2 9x19 carbine
            "58948c8e86f77409493f7266": 40,	// SIG MPX 9x19 submachine gun
            "5cc82d76e24e8d00134b4b83": 60,	// FN P90 5.7x28 submachine gun
            "62e14904c2699c0ec93adc47": 40,	// SR-2M "Veresk" 9x21 submachine gun
            "5926bb2186f7744b1c6c6e60": 40,	// HK MP5 9x19 submachine gun (Navy 3 Round Burst)
            "5d2f0d8048f0356c925bc3b0": 0,	// HK MP5K 9x19 submachine gun
            "5ba26383d4351e00334c93d9": 40,	// HK MP7A1 4.6x30 submachine gun
            "5bd70322209c4d00d7167b8f": 60,	// HK MP7A2 4.6x30 submachine gun
            "5e00903ae9dc277128008b87": 0,	// B&T MP9 9x19 submachine gun
            "5de7bd7bfd6b4e6e2276dc25": 20,	// B&T MP9-N 9x19 submachine gun
            "5fc3f2d5900b1d5091531e57": 60,	// TDI KRISS Vector Gen.2 9x19 submachine gun
            "5fb64bc92b1b027b1f50bcf2": 60,	// TDI KRISS Vector Gen.2 .45 ACP submachine gun
            "5fc3e272f8b6a877a729eac5": 40,	// HK UMP .45 ACP submachine gun
            "57d14d2524597714373db789": 30,	// PP-91 "Kedr" 9x18PM submachine gun
            "5ea03f7400685063ec28bfa8": 20,	// PPSh-41 7.62x25 submachine gun
            // 7.62x39mm (Bik AK/SKS)
            "587e02ff24597743df3deaeb": 0,	// Simonov OP-SKS 7.62x39 carbine (Hunting Rifle Version)
            "574d967124597745970e7c94": 20,	// Simonov SKS 7.62x39 carbine
            "59e6152586f77473dc057aa1": 0,	// Molot VPO-136 "Vepr-KM" 7.62x39 carbine
            "5ac66d2e5acfc43b321d4b53": 60,	// Kalashnikov AK-103 7.62x39 assault rifle
            "5ac66d725acfc43b321d4b60": 60,	// Kalashnikov AK-104 7.62x39 assault rifle
            "59d6088586f774275f37482f": 60,	// Kalashnikov AKM 7.62x39 assault rifle
            "5a0ec13bfcdbcb00165aa685": 60,	// Kalashnikov AKMN 7.62x39 assault rifle
            "59ff346386f77477562ff5e2": 60,	// Kalashnikov AKMS 7.62x39 assault rifle
            "5abcbc27d8ce8700182eceeb": 60,	// Kalashnikov AKMSN 7.62x39 assault rifle
            "606587252535c57a13424cfd": 60,	// CMMG Mk47 Mutant 7.62x39 assault rifle
            "628a60ae6b1d481ff772e9c8": 99,	// Rifle Dynamics RD-704 7.62x39 assault rifle
            // 7.62x51mm NATO (Bik AR, three 'o' hate)
            "5f2a9575926fd9352339381f": 40,	// Kel-Tec RFB 7.62x51 rifle
            "5c501a4d2e221602b412b540": 0,	// Molot VPO-101 "Vepr-Hunter" 7.62x51 carbine
            "5dcbd56fdbd3d91b3e5468d5": 60,	// Desert Tech MDR 7.62x51 assault rifle
            "5b0bbe4e5acfc40dc528a72d": 80,	// DS Arms SA-58 7.62x51 assault rifle
            "6183afd850224f204c1da514": 80,	// FN SCAR-H 7.62x51 assault rifle
            "6165ac306ef05c2ce828ef74": 80,	// FN SCAR-H 7.62x51 assault rifle (FDE)
            "6176aca650224f204c1da3fb": 80,	// HK G28 7.62x51 marksman rifle
            "5aafa857e5b5b00018480968": 50,	// Springfield Armory M1A 7.62x51 rifle
            "5a367e5dc4a282000e49738f": 50,	// Remington R11 RSASS 7.62x51 marksman rifle
            "5df8ce05b11454561e39243b": 80,	// Knight's Armament Company SR-25 7.62x51 marksman rifle
            "588892092459774ac91d4b11": 99,	// Lobaev Arms DVL-10 7.62x51 bolt-action sniper rifle
            "5bfea6e90db834001b7347f3": 99,	// Remington Model 700 7.62x51 bolt-action sniper rifle
            "5df24cf80dee1b22f862e9bc": 99,	// ORSIS T-5000M 7.62x51 bolt-action sniper rifle /
            // 7.62x54mmR (Mosin/SVD/PKM Soon™)
            "5c46fbd72e2216398b5a8c9c": 99,	// SVDS 7.62x54R sniper rifle
            "5bfd297f0db834001a669119": 0,	// Mosin 7.62x54R bolt-action rifle (Infantry)
            "5ae08f0a5acfc408fb1398a1": 0,	// Mosin 7.62x54R bolt-action rifle (Sniper)
            "61f7c9e189e6fb1a5e3ea78d": 0,	// MP-18 7.62x54R single-shot rifle
            "55801eed4bdc2d89578b4588": 20,	// SV-98 7.62x54R bolt-action sniper rifle
            // .338 Lapua Magnum
            "5fc22d7c187fea44d52eda44": 20,	// SWORD International Mk-18 .338 LM marksman rifle
            "627e14b21713922ded6f2c15": 20,	// Accuracy International AXMC .338 LM bolt-action sniper rifle
            // 9x39mm (VSS/VAL)
            "57838ad32459774a17445cd2": 20,	// VSS Vintorez 9x39 special sniper rifle
            "57c44b372459772d2b39b8ce": 60	// AS VAL 9x39 special assault rifle
        }

        // Secondary Slot Weapon (5% bonus gun)
        db.bots.types.usec.inventory.equipment.SecondPrimaryWeapon = {
            "5cadfbf7ae92152ac412eeef": 40,	// ASh-12 12.7x55 assault rifle
            // Shotguns
            "6259b864ebedf17603599e88": 60,	// Benelli M3 Super 90 dual-mode 12ga shotgun
            "5e870397991fd70db46995c8": 0,	// Mossberg 590A1 12ga pump-action shotgun
            "5a7828548dc32e5a9c28b516": 0,	// Remington Model 870 12ga pump-action shotgun
            "54491c4f4bdc2db1078b4568": 0,	// MP-133 12ga pump-action shotgun
            "56dee2bdd2720bc8328b4567": 80,	// MP-153 12ga semi-automatic shotgun
            "606dae0ab0e443224b421bb7": 80,	// MP-155 12ga semi-automatic shotgun
            "5580223e4bdc2d1c128b457f": 0,	// MP-43-1C 12ga double-barrel shotgun
            "60db29ce99594040e04c4a27": 0,	// MTs-255-12 12ga shotgun
            "576165642459773c7a400233": 99,	// Saiga 12ga ver.10 12/76 semi-automatic shotgun
            "5a38e6bac4a2826c6e06d79b": 0,	// TOZ-106 20ga bolt-action shotgun
            "5e848cc2988a8701445df1e8": 40,	// TOZ KS-23M 23x75mm pump-action shotgun
            // .366 TKM
            "59e6687d86f77411d949b251": 40,	// Molot VPO-209 .366 TKM carbine
            "5de652c31b7e3716273428be": 0,	// Molot VPO-215 "Gornostay" .366 TKM bolt-action rifle
            //Grenade Launchers
            "5e81ebcd8e146c7080625e15": 20,	// FN40GL Mk2 40mm grenade launcher
            "6275303a9f372d6ea97f9ec7": 20,	// Milkor M32A1 MSGL 40mm grenade launcher
            // 5.45x39mm (smol AK)
            "628b5638ad252a16da6dd245": 60,	// SAG AK-545 5.45x39 carbine
            "628b9c37a733087d0d7fe84b": 0,	// SAG AK-545 Short 5.45x39 carbine
            "5ac66d9b5acfc4001633997a": 80,	// Kalashnikov AK-105 5.45x39 assault rifle
            "5bf3e03b0db834001d2c4a9c": 60,	// Kalashnikov AK-74 5.45x39 assault rifle
            "5ac4cd105acfc40016339859": 80,	// Kalashnikov AK-74M 5.45x39 assault rifle
            "5644bd2b4bdc2d3b4c8b4572": 60,	// Kalashnikov AK-74N 5.45x39 assault rifle
            "5bf3e0490db83400196199af": 60,	// Kalashnikov AKS-74 5.45x39 assault rifle
            "5ab8e9fcd8ce870019439434": 0,	// Kalashnikov AKS-74N 5.45x39 assault rifle
            "57dc2fa62459775949412633": 0,	// Kalashnikov AKS-74U 5.45x39 assault rifle
            "583990e32459771419544dd2": 0,	// Kalashnikov AKS-74UN 5.45x39 assault rifle
            "5839a40f24597726f856b511": 0,	// Kalashnikov AKS-74UB 5.45x39 assault rifle
            "5beed0f50db834001c062b12": 60,	// RPK-16 5.45x39 light machine gun
            // .556/.300 Blackout
            "5c07c60e0db834002330051f": 0,	// ADAR 2-15 5.56x45 carbine
            "5d43021ca4b9362eab4b5e25": 0,	// Lone Star TX-15 DML 5.56x45 carbine
            "5ac66cb05acfc40198510a10": 80,	// Kalashnikov AK-101 5.56x45 assault rifle
            "5ac66d015acfc400180ae6e4": 80,	// Kalashnikov AK-102 5.56x45 assault rifle
            "62e7c4fba689e8c9c50dfc38": 40,	// Steyr AUG A1 5.56x45 assault rifle
            "63171672192e68c5460cebc5": 40,	// Steyr AUG A3 5.56x45 assault rifle
            "5c488a752e221602b412af63": 40,	// Desert Tech MDR 5.56x45 assault rifle
            "5bb2475ed4351e00853264e3": 99,	// HK 416A5 5.56x45 assault rifle
            "623063e994fc3f7b302a9696": 60,	// HK G36 5.56x45 assault rifle
            "5447a9cd4bdc2dbd208b4567": 99,	// M4A1 Assault Rifle
            "6184055050224f204c1da540": 60,	// FN SCAR-L 5.56x45 assault rifle
            "618428466ef05c2ce828f218": 60,	// FN SCAR-L 5.56x45 assault rifle (FDE)
            "5fbcc1d9016cce60e8341ab3": 60,	// SIG MCX .300 Blackout assault rifle
            // PDW,SMG/9mm
            "59f9cabd86f7743a10721f46": 0,	// Saiga-9 9x19 carbine
            "60339954d62c9b14ed777c06": 0,	// Soyuz-TM STM-9 Gen.2 9x19 carbine
            "58948c8e86f77409493f7266": 40,	// SIG MPX 9x19 submachine gun
            "5cc82d76e24e8d00134b4b83": 60,	// FN P90 5.7x28 submachine gun
            "62e14904c2699c0ec93adc47": 40,	// SR-2M "Veresk" 9x21 submachine gun
            "5926bb2186f7744b1c6c6e60": 40,	// HK MP5 9x19 submachine gun (Navy 3 Round Burst)
            "5d2f0d8048f0356c925bc3b0": 0,	// HK MP5K 9x19 submachine gun
            "5ba26383d4351e00334c93d9": 40,	// HK MP7A1 4.6x30 submachine gun
            "5bd70322209c4d00d7167b8f": 60,	// HK MP7A2 4.6x30 submachine gun
            "5e00903ae9dc277128008b87": 0,	// B&T MP9 9x19 submachine gun
            "5de7bd7bfd6b4e6e2276dc25": 20,	// B&T MP9-N 9x19 submachine gun
            "5fc3f2d5900b1d5091531e57": 60,	// TDI KRISS Vector Gen.2 9x19 submachine gun
            "5fb64bc92b1b027b1f50bcf2": 60,	// TDI KRISS Vector Gen.2 .45 ACP submachine gun
            "5fc3e272f8b6a877a729eac5": 40,	// HK UMP .45 ACP submachine gun
            "57d14d2524597714373db789": 30,	// PP-91 "Kedr" 9x18PM submachine gun
            "5ea03f7400685063ec28bfa8": 20,	// PPSh-41 7.62x25 submachine gun
            // 7.62x39mm (Bik AK/SKS)
            "587e02ff24597743df3deaeb": 0,	// Simonov OP-SKS 7.62x39 carbine (Hunting Rifle Version)
            "574d967124597745970e7c94": 20,	// Simonov SKS 7.62x39 carbine
            "59e6152586f77473dc057aa1": 0,	// Molot VPO-136 "Vepr-KM" 7.62x39 carbine
            "5ac66d2e5acfc43b321d4b53": 60,	// Kalashnikov AK-103 7.62x39 assault rifle
            "5ac66d725acfc43b321d4b60": 60,	// Kalashnikov AK-104 7.62x39 assault rifle
            "59d6088586f774275f37482f": 60,	// Kalashnikov AKM 7.62x39 assault rifle
            "5a0ec13bfcdbcb00165aa685": 60,	// Kalashnikov AKMN 7.62x39 assault rifle
            "59ff346386f77477562ff5e2": 60,	// Kalashnikov AKMS 7.62x39 assault rifle
            "5abcbc27d8ce8700182eceeb": 60,	// Kalashnikov AKMSN 7.62x39 assault rifle
            "606587252535c57a13424cfd": 60,	// CMMG Mk47 Mutant 7.62x39 assault rifle
            "628a60ae6b1d481ff772e9c8": 99,	// Rifle Dynamics RD-704 7.62x39 assault rifle
            // 7.62x51mm NATO (Bik AR, three 'o' hate)
            "5f2a9575926fd9352339381f": 40,	// Kel-Tec RFB 7.62x51 rifle
            "5c501a4d2e221602b412b540": 0,	// Molot VPO-101 "Vepr-Hunter" 7.62x51 carbine
            "5dcbd56fdbd3d91b3e5468d5": 60,	// Desert Tech MDR 7.62x51 assault rifle
            "5b0bbe4e5acfc40dc528a72d": 80,	// DS Arms SA-58 7.62x51 assault rifle
            "6183afd850224f204c1da514": 80,	// FN SCAR-H 7.62x51 assault rifle
            "6165ac306ef05c2ce828ef74": 80,	// FN SCAR-H 7.62x51 assault rifle (FDE)
            "6176aca650224f204c1da3fb": 80,	// HK G28 7.62x51 marksman rifle
            "5aafa857e5b5b00018480968": 50,	// Springfield Armory M1A 7.62x51 rifle
            "5a367e5dc4a282000e49738f": 50,	// Remington R11 RSASS 7.62x51 marksman rifle
            "5df8ce05b11454561e39243b": 80,	// Knight's Armament Company SR-25 7.62x51 marksman rifle
            "588892092459774ac91d4b11": 99,	// Lobaev Arms DVL-10 7.62x51 bolt-action sniper rifle
            "5bfea6e90db834001b7347f3": 99,	// Remington Model 700 7.62x51 bolt-action sniper rifle
            "5df24cf80dee1b22f862e9bc": 99,	// ORSIS T-5000M 7.62x51 bolt-action sniper rifle /
            // 7.62x54mmR (Mosin/SVD/PKM Soon™)
            "5c46fbd72e2216398b5a8c9c": 99,	// SVDS 7.62x54R sniper rifle
            "5bfd297f0db834001a669119": 0,	// Mosin 7.62x54R bolt-action rifle (Infantry)
            "5ae08f0a5acfc408fb1398a1": 0,	// Mosin 7.62x54R bolt-action rifle (Sniper)
            "61f7c9e189e6fb1a5e3ea78d": 0,	// MP-18 7.62x54R single-shot rifle
            "55801eed4bdc2d89578b4588": 20,	// SV-98 7.62x54R bolt-action sniper rifle
            // .338 Lapua Magnum
            "5fc22d7c187fea44d52eda44": 20,	// SWORD International Mk-18 .338 LM marksman rifle
            "627e14b21713922ded6f2c15": 20,	// Accuracy International AXMC .338 LM bolt-action sniper rifle
            // 9x39mm (VSS/VAL)
            "57838ad32459774a17445cd2": 20,	// VSS Vintorez 9x39 special sniper rifle
            "57c44b372459772d2b39b8ce": 60	// AS VAL 9x39 special assault rifle
        }
    }

    private clearWeights(botConfig: IBotConfig)
    {
        for (const botType of ["pmc", "assault"])
        {
            this.clearEquipmentWeights(botConfig.equipment[botType].weightingAdjustmentsByBotLevel);
            this.clearEquipmentWeights(botConfig.equipment[botType].weightingAdjustmentsByPlayerLevel);
        }

        // Note: This is a hacky workaround for bad data in the scav bot.json file
        botConfig.equipment["assault"].weightingAdjustmentsByBotLevel = [];
        botConfig.equipment["assault"].weightingAdjustmentsByPlayerLevel = [];
    }

    private clearEquipmentWeights(weightingTiers)
    {
        if (weightingTiers)
        {
            for (const weightingTier of weightingTiers)
            {
                if (weightingTier.equipment?.add)
                {
                    weightingTier.equipment.add.TacticalVest = {};
                    weightingTier.equipment.add.ArmorVest = {};
                    weightingTier.equipment.add.FirstPrimaryWeapon = {};
                }
        
                if (weightingTier.equipment?.edit)
                {
                    weightingTier.equipment.edit.TacticalVest = {};
                    weightingTier.equipment.edit.ArmorVest = {};
                    weightingTier.equipment.edit.FirstPrimaryWeapon = {};
                }
            }
        }
    }

    private loadJson(jsonPath: string): any
    {
        jsonPath = path.join(__dirname, jsonPath);
        console.log(`Loading ${jsonPath}`);
        return JSON5.parse(fs.readFileSync(jsonPath, "utf-8"));
    }
}

module.exports = { mod: new BEAST() }